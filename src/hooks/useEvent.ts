// Event payload types
export interface InitSearchParams {
    agent: 'heatmap_greedy' | string; // Use union types for known agents
    current_loc: [number, number]; // Tuple type for coordinates
    grid_size: number;
    num_canvas: number;
}

export interface SearchInitializedData {
    message: string;
    agent: string;
    grid_size: number;
    num_canvas: number;
}

// Event type definitions
export interface ClientToServerEvents {
    init_search: (params: InitSearchParams) => void;
    get_next_target: (params: NextTargetParams) => void;
}

export interface ServerToClientEvents {
    search_initialized: (data: SearchInitializedData) => void;
    next_target: (data: NextTargetData) => void;
    error: (message: string) => void;
    session_created: (sessionID: string) => void;
}

// types.ts updates
export interface NextTargetParams {
    current_loc: [number, number];
    rssi: number;
    model_version: string;
    guide_weight: number;
}

export interface NextTargetData {
    next_target: [number, number];
    current_loc: [number, number];
    rssi: number;
    heatmap?: number[][];
    heatmap_image?: string;
}

// Add session-related types
export interface SessionData {
    id: string;
    agent?: string;
    current_search?: InitSearchParams;
    history: NextTargetData[];
  }
  
  export interface SessionAuth {
    sessionID?: string;
  }

// socket-manager.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://10.0.0.17:5000'; // Replace with your server URL
const CONNECTION_TIMEOUT = 30000; // 30 seconds

export class SearchClient {
    private sessionID: string | null = null;
    private socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    private sessionStorageKey = 'search-session';
    public connected: boolean = false;

  constructor() {
    const savedSession = localStorage.getItem(this.sessionStorageKey);
    this.sessionID = savedSession ? JSON.parse(savedSession).id : null;
    this.socket = io(SOCKET_SERVER_URL, {
      autoConnect: false,
      reconnection: true,
      transports: ['websocket']
    });
    this.setupSessionHandlers();
    this.setupBaseListeners();
  }

  private setupBaseListeners() {
    this.socket.on('connect', () => {
      this.connected = true;
      console.log("CONNECTED", this.connected)
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      console.log("DISCONNECTED", this.connected)

    });
  }

  private setupSessionHandlers() {
    // Handle new session creation
    this.socket.on('session_created', (newSessionID: string) => {
      this.sessionID = newSessionID;
      localStorage.setItem(this.sessionStorageKey, JSON.stringify({
        id: newSessionID,
        createdAt: new Date().toISOString()
      }));
    });

    // Handle session restoration errors
    this.socket.on('session_error', (message: string) => {
      console.error('Session error:', message);
      this.clearSession();
    });
  }

  public async connect(): Promise<void> {
    if (this.connected) return;
    
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'));
        this.cleanup();
      }, CONNECTION_TIMEOUT);

      this.socket.auth = this.sessionID ? { sessionID: this.sessionID } : {};

      const connectHandler = () => {
        clearTimeout(timeout);
        resolve();
      };

      const errorHandler = (err: Error) => {
        clearTimeout(timeout);
        if (this.sessionID) {
          console.warn('Session restoration failed, creating new session');
          this.clearSession();
          this.connect().then(resolve).catch(reject);
        } else {
          reject(err);
        }
      };

      this.socket
        .once('connect', connectHandler)
        .once('connect_error', errorHandler)
        .connect();
    });
  }

  private clearSession() {
    this.sessionID = null;
    localStorage.removeItem(this.sessionStorageKey);
    this.socket.auth = {};
  }

  public async resumeSession(): Promise<SessionData> {
    if (!this.sessionID) throw new Error('No session to resume');
    
    return new Promise((resolve, reject) => {
      this.socket.emit('resume_session', this.sessionID, (response) => {
        if (response.success) {
          resolve(response.session);
        } else {
          this.clearSession();
          reject(new Error(response.error));
        }
      });
    });
  }

  public async initializeSearch(
    params: InitSearchParams
  ): Promise<SearchInitializedData> {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        this.socket.connect();
      }

      const timeout = setTimeout(() => {
        reject(new Error('Connection timeout'));
        this.cleanup();
      }, CONNECTION_TIMEOUT);

      // Handle search initialization response
      const successHandler = (data: SearchInitializedData) => {
        clearTimeout(timeout);
        resolve(data);
        // this.cleanup();
      };

      // Handle errors
      const errorHandler = (message: string) => {
        clearTimeout(timeout);
        reject(new Error(message));
        this.cleanup();
      };

      // Setup temporary listeners
      this.socket
        .once('search_initialized', successHandler)
        .once('error', errorHandler)
        .emit('init_search', params);
      
      console.log("emit init_search")
    });
  }

  public async getNextTarget(
    params: NextTargetParams
  ): Promise<NextTargetData> {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject(new Error('Not connected to server'));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Next target request timeout'));
        this.cleanup();
      }, CONNECTION_TIMEOUT);

      const successHandler = (data: NextTargetData) => {
        clearTimeout(timeout);
        resolve(data);
        // this.cleanup();
      };

      const errorHandler = (message: string) => {
        clearTimeout(timeout);
        reject(new Error(message));
        this.cleanup();
      };

      this.socket
        .once('next_target', successHandler)
        .once('error', errorHandler)
        .emit('get_next_target', params);
    });
  }

  private cleanup() {
    this.socket
      .off('search_initialized')
      .off('error')
      .disconnect();
    console.log("Cleanup()")
  }

}

// Usage example
export async function performSearch(params: InitSearchParams, client: SearchClient) {
  try {
    console.log("performSearch");
    const result = await client.initializeSearch(params);
    return {
      success: true,
      data: result,
      client: client
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function fetchNextTarget(params: NextTargetParams, client: SearchClient) {
    try {
        // First connect if needed
        // if (!client.connected) {
        //     await client.connect(); // You'll need to implement connect()
            // client.initializeSearch({
            //     agent: 'heatmap_greedy',
            //     current_loc: [22.084, 37.422],
            //     grid_size: 250,
            //     num_canvas: 56
            //   });
        // }
        const result = await client.getNextTarget(params);
        return {
          success: true,
          data: result
        };
    } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
  
//   // Example UI integration
//   async function handleNextTarget() {
//     const params = {
//       current_loc: [22.084, 37.422],
//       rssi: -110,
//       model_version: 'v1',
//       guide_weight: 2.0
//     };
  
//     const { success, data, error } = await fetchNextTarget(params);
  
//     if (success && data) {
//       console.log('Next target:', data.next_target);
      
//       if (data.heatmap_image) {
//         updateHeatmapDisplay(data.heatmap_image);
//       }
      
//       if (data.heatmap) {
//         updateHeatmapData(data.heatmap);
//       }
//     } else {
//       showError(error || 'Failed to get next target');
//     }
//   }
  
//   // Helper functions example
//   function updateHeatmapDisplay(base64Image: string) {
//     const container = document.getElementById('heatmap-container');
//     container.innerHTML = ''; // Clear previous
    
//     const img = new Image();
//     img.src = `data:image/png;base64,${base64Image}`;
//     img.className = 'heatmap-image';
//     container.appendChild(img);
//   }
  
//   function updateHeatmapData(heatmap: number[][]) {
//     // Implement your heatmap data processing
//     console.log('Received heatmap data:', heatmap);
//   }
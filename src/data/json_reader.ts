// Define types for the data structure
interface GatewayData {
  gateway: [number, number, number, number][];
  init_object: {
    origin_loc: [number, number];
    start_loc: [number, number];
    grid_size: number;
    num_canvas: number;
    agent: string;
  };
  return_image: boolean;
  gateway_lon: number;
  gateway_lat: number;
}

interface GatewayFiles {
  gw1: {
    json: GatewayData;
    png: string;
  };
  gw2: {
    json: GatewayData;
    png: string;
  };
  gw4: {
    json: GatewayData;
    png: string;
  };
  gw5: {
    json: GatewayData;
    png: string;
  };
  gw6: {
    json: GatewayData;
    png: string;
  };
  gw7: {
    json: GatewayData;
    png: string;
  };
}

// Import all JSON files
import gw1Json from './gw_1.json';
import gw2Json from './gw_2.json';
import gw4Json from './gw_4.json';
import gw5Json from './gw_5.json';
import gw6Json from './gw_6.json';
import gw7Json from './gw_7.json';

// Import all PNG files
import gw1Png from './gw_1.png';
import gw2Png from './gw_2.png';
import gw4Png from './gw_4.png';
import gw5Png from './gw_5.png';
import gw6Png from './gw_6.png';
import gw7Png from './gw_7.png';

// Create the exported object with typed data
const gatewayFiles: GatewayFiles = {
  gw1: {
    json: gw1Json,
    png: gw1Png
  },
  gw2: {
    json: gw2Json,
    png: gw2Png
  },
  gw4: {
    json: gw4Json,
    png: gw4Png
  },
  gw5: {
    json: gw5Json,
    png: gw5Png
  },
  gw6: {
    json: gw6Json,
    png: gw6Png
  },
  gw7: {
    json: gw7Json,
    png: gw7Png
  }
};

export default gatewayFiles;

// Export individual gateways if needed
export const gw1 = gatewayFiles.gw1;
export const gw2 = gatewayFiles.gw2;
export const gw4 = gatewayFiles.gw4;
export const gw5 = gatewayFiles.gw5;
export const gw6 = gatewayFiles.gw6;
export const gw7 = gatewayFiles.gw7;

export function getJsonValue(loc: [number, number], jsonFile: string): number {
  const key = `${loc[0]}_${loc[1]}`;
  switch (jsonFile) {
    case 'gw_1':
      return gw1Json[key];
    case 'gw_2':
      return gw2Json[key];
    case 'gw_4':
      return gw4Json[key];
    case 'gw_5':
      return gw5Json[key];
    case 'gw_6':
      return gw6Json[key];
    case 'gw_7':
      return gw7Json[key];
    default:
      throw new Error(`Unknown json file: ${jsonFile}`);
  }
}



interface McpSmpData {
  mcpSmps: McpSmp[];
  statistics: McpSmpStatistic[];
}

interface McpSmp {
  date: string;
  mcp: number;
  smp: number;
  mcpState: string;
  smpDirection: string;
}

interface McpSmpStatistic {
  date: string;
  mcpAvg: number;
  mcpMax: number;
  mcpMin: number;
  mcpWeightedAverage: number;
  smpAvg: number;
  smpMax: number;
  smpMin: number;
  smpWeightedAverage: number;
}

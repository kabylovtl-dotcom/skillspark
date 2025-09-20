import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";
import path from "path";

export interface PhysicsTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface PhysicsToolResult {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export class PhysicsMCPClient {
  private client: Client;
  private transport: StdioClientTransport;
  private isConnected: boolean = false;

  constructor() {
    this.client = new Client({
      name: "skillspark-physics-client",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {}
      }
    });
  }

  async connect(): Promise<void> {
    try {
      // Start the MCP server as a child process
      const serverPath = path.join(process.cwd(), 'dist/mcp/physics-server.js');
      const serverProcess = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'inherit']
      });

      this.transport = new StdioClientTransport({
        reader: serverProcess.stdout!,
        writer: serverProcess.stdin!
      });

      await this.client.connect(this.transport);
      this.isConnected = true;
      console.log("🔗 Connected to Physics MCP Server");
    } catch (error) {
      console.error("❌ Failed to connect to MCP server:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      console.log("🔌 Disconnected from Physics MCP Server");
    }
  }

  async getAvailableTools(): Promise<PhysicsTool[]> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await this.client.listTools();
      return result.tools.map(tool => ({
        name: tool.name,
        description: tool.description || "",
        inputSchema: tool.inputSchema
      }));
    } catch (error) {
      console.error("❌ Failed to get tools:", error);
      return [];
    }
  }

  async callTool(toolName: string, arguments_: any): Promise<PhysicsToolResult | null> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: arguments_
      });

      return {
        content: result.content
      };
    } catch (error) {
      console.error(`❌ Failed to call tool ${toolName}:`, error);
      return null;
    }
  }

  async getResources(): Promise<any[]> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await this.client.listResources();
      return result.resources;
    } catch (error) {
      console.error("❌ Failed to get resources:", error);
      return [];
    }
  }

  async readResource(uri: string): Promise<any> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      const result = await this.client.readResource({ uri });
      return result;
    } catch (error) {
      console.error(`❌ Failed to read resource ${uri}:`, error);
      return null;
    }
  }

  // Convenience methods for specific physics calculations
  async calculateForce(mass: number, acceleration: number): Promise<string> {
    const result = await this.callTool("calculate-force", { mass, acceleration });
    return result?.content[0]?.text || "❌ Failed to calculate force";
  }

  async calculateVelocity(initialVelocity: number, acceleration: number, time: number): Promise<string> {
    const result = await this.callTool("calculate-velocity", { 
      initialVelocity, 
      acceleration, 
      time 
    });
    return result?.content[0]?.text || "❌ Failed to calculate velocity";
  }

  async calculateKineticEnergy(mass: number, velocity: number): Promise<string> {
    const result = await this.callTool("calculate-kinetic-energy", { mass, velocity });
    return result?.content[0]?.text || "❌ Failed to calculate kinetic energy";
  }

  async calculateGravitationalForce(mass1: number, mass2: number, distance: number): Promise<string> {
    const result = await this.callTool("calculate-gravitational-force", { 
      mass1, 
      mass2, 
      distance 
    });
    return result?.content[0]?.text || "❌ Failed to calculate gravitational force";
  }

  async calculateOhmsLaw(params: { voltage?: number; current?: number; resistance?: number }): Promise<string> {
    const result = await this.callTool("calculate-ohms-law", params);
    return result?.content[0]?.text || "❌ Failed to calculate Ohm's Law";
  }

  async getNewtonsLaws(): Promise<string> {
    const result = await this.readResource("physics://newton-laws");
    return result?.contents[0]?.text || "❌ Failed to get Newton's Laws";
  }

  async getKinematicEquations(): Promise<string> {
    const result = await this.readResource("physics://kinematic-equations");
    return result?.contents[0]?.text || "❌ Failed to get kinematic equations";
  }
}

// Singleton instance
let physicsClient: PhysicsMCPClient | null = null;

export function getPhysicsClient(): PhysicsMCPClient {
  if (!physicsClient) {
    physicsClient = new PhysicsMCPClient();
  }
  return physicsClient;
}

export default PhysicsMCPClient;


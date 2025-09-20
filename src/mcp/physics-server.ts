import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server for physics tools
const server = new McpServer({
  name: "skillspark-physics-server",
  version: "1.0.0"
});

// Physics calculation tools
server.registerTool("calculate-force",
  {
    title: "Force Calculator",
    description: "Calculate force using F = ma (Newton's second law)",
    inputSchema: {
      mass: z.number().describe("Mass in kilograms"),
      acceleration: z.number().describe("Acceleration in m/s²")
    }
  },
  async ({ mass, acceleration }) => {
    const force = mass * acceleration;
    return {
      content: [{
        type: "text",
        text: `🔬 Force Calculation:\n\nF = ma\nF = ${mass} kg × ${acceleration} m/s²\nF = ${force} N\n\nForce = ${force} Newtons`
      }]
    };
  }
);

server.registerTool("calculate-velocity",
  {
    title: "Velocity Calculator",
    description: "Calculate velocity using v = u + at (kinematic equation)",
    inputSchema: {
      initialVelocity: z.number().describe("Initial velocity in m/s"),
      acceleration: z.number().describe("Acceleration in m/s²"),
      time: z.number().describe("Time in seconds")
    }
  },
  async ({ initialVelocity, acceleration, time }) => {
    const finalVelocity = initialVelocity + (acceleration * time);
    return {
      content: [{
        type: "text",
        text: `🏃 Velocity Calculation:\n\nv = u + at\nv = ${initialVelocity} m/s + (${acceleration} m/s² × ${time} s)\nv = ${initialVelocity} + ${acceleration * time}\nv = ${finalVelocity} m/s\n\nFinal velocity = ${finalVelocity} m/s`
      }]
    };
  }
);

server.registerTool("calculate-kinetic-energy",
  {
    title: "Kinetic Energy Calculator",
    description: "Calculate kinetic energy using KE = ½mv²",
    inputSchema: {
      mass: z.number().describe("Mass in kilograms"),
      velocity: z.number().describe("Velocity in m/s")
    }
  },
  async ({ mass, velocity }) => {
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    return {
      content: [{
        type: "text",
        text: `⚡ Kinetic Energy Calculation:\n\nKE = ½mv²\nKE = ½ × ${mass} kg × (${velocity} m/s)²\nKE = 0.5 × ${mass} × ${velocity * velocity}\nKE = ${kineticEnergy} J\n\nKinetic Energy = ${kineticEnergy} Joules`
      }]
    };
  }
);

server.registerTool("calculate-gravitational-force",
  {
    title: "Gravitational Force Calculator",
    description: "Calculate gravitational force using F = G(m₁m₂)/r²",
    inputSchema: {
      mass1: z.number().describe("Mass of first object in kg"),
      mass2: z.number().describe("Mass of second object in kg"),
      distance: z.number().describe("Distance between objects in meters")
    }
  },
  async ({ mass1, mass2, distance }) => {
    const G = 6.67430e-11; // Gravitational constant
    const force = (G * mass1 * mass2) / (distance * distance);
    return {
      content: [{
        type: "text",
        text: `🌍 Gravitational Force Calculation:\n\nF = G(m₁m₂)/r²\nF = ${G} × (${mass1} kg × ${mass2} kg) / (${distance} m)²\nF = ${G} × ${mass1 * mass2} / ${distance * distance}\nF = ${force} N\n\nGravitational Force = ${force} Newtons`
      }]
    };
  }
);

server.registerTool("calculate-ohms-law",
  {
    title: "Ohm's Law Calculator",
    description: "Calculate voltage, current, or resistance using Ohm's Law",
    inputSchema: {
      voltage: z.number().optional().describe("Voltage in volts"),
      current: z.number().optional().describe("Current in amperes"),
      resistance: z.number().optional().describe("Resistance in ohms")
    }
  },
  async ({ voltage, current, resistance }) => {
    let result = "";
    
    if (voltage && current && !resistance) {
      // Calculate resistance: R = V/I
      const calculatedResistance = voltage / current;
      result = `🔌 Resistance Calculation (Ohm's Law):\n\nR = V/I\nR = ${voltage} V / ${current} A\nR = ${calculatedResistance} Ω\n\nResistance = ${calculatedResistance} Ohms`;
    } else if (voltage && resistance && !current) {
      // Calculate current: I = V/R
      const calculatedCurrent = voltage / resistance;
      result = `⚡ Current Calculation (Ohm's Law):\n\nI = V/R\nI = ${voltage} V / ${resistance} Ω\nI = ${calculatedCurrent} A\n\nCurrent = ${calculatedCurrent} Amperes`;
    } else if (current && resistance && !voltage) {
      // Calculate voltage: V = IR
      const calculatedVoltage = current * resistance;
      result = `🔋 Voltage Calculation (Ohm's Law):\n\nV = I × R\nV = ${current} A × ${resistance} Ω\nV = ${calculatedVoltage} V\n\nVoltage = ${calculatedVoltage} Volts`;
    } else {
      result = `❌ Please provide exactly 2 values to calculate the third using Ohm's Law.\n\nAvailable calculations:\n• R = V/I (calculate resistance)\n• I = V/R (calculate current)\n• V = I × R (calculate voltage)`;
    }
    
    return {
      content: [{
        type: "text",
        text: result
      }]
    };
  }
);

// Physics formula resources
server.registerResource(
  "newton-laws",
  new ResourceTemplate("physics://newton-laws", { list: undefined }),
  {
    title: "Newton's Laws of Motion",
    description: "Reference for Newton's three laws of motion"
  },
  async () => ({
    contents: [{
      uri: "physics://newton-laws",
      text: `📚 Newton's Laws of Motion:

1️⃣ First Law (Law of Inertia):
   "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force."
   Formula: F = 0 → v = constant

2️⃣ Second Law (Force and Acceleration):
   "Force equals mass times acceleration."
   Formula: F = ma
   
3️⃣ Third Law (Action and Reaction):
   "For every action, there is an equal and opposite reaction."
   Formula: F₁ = -F₂

💡 Applications:
• Car safety (seatbelts, airbags)
• Rocket propulsion
• Sports physics
• Everyday motion`
    }]
  })
);

server.registerResource(
  "kinematic-equations",
  new ResourceTemplate("physics://kinematic-equations", { list: undefined }),
  {
    title: "Kinematic Equations",
    description: "Reference for motion equations"
  },
  async () => ({
    contents: [{
      uri: "physics://kinematic-equations",
      text: `🏃 Kinematic Equations:

1️⃣ v = u + at
   (Final velocity = Initial velocity + acceleration × time)

2️⃣ s = ut + ½at²
   (Displacement = Initial velocity × time + ½ × acceleration × time²)

3️⃣ v² = u² + 2as
   (Final velocity² = Initial velocity² + 2 × acceleration × displacement)

4️⃣ s = ½(u + v)t
   (Displacement = ½ × (Initial velocity + Final velocity) × time)

Where:
• v = final velocity (m/s)
• u = initial velocity (m/s)
• a = acceleration (m/s²)
• t = time (s)
• s = displacement (m)`
    }]
  })
);

// Start the server
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("🚀 SkillSpark Physics MCP Server started!");
}

// Export for use in the application
export { server, startServer };

// Start server if this file is run directly
if (typeof process !== 'undefined' && process.argv[1] && process.argv[1].endsWith('physics-server.js')) {
  startServer().catch(console.error);
}

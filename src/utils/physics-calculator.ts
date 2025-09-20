import { getPhysicsClient } from '../mcp/mcp-client';

export interface PhysicsCalculation {
  type: 'force' | 'velocity' | 'kinetic-energy' | 'gravitational-force' | 'ohms-law';
  params: any;
  result?: string;
  error?: string;
}

export class PhysicsCalculator {
  private client = getPhysicsClient();

  // Parse physics questions and extract parameters
  static parsePhysicsQuestion(question: string): PhysicsCalculation | null {
    const lowerQuestion = question.toLowerCase();

    // Force calculation: F = ma
    const forceMatch = lowerQuestion.match(/(?:force|сила).*(?:mass|масса).*?(\d+(?:\.\d+)?).*(?:acceleration|ускорение).*?(\d+(?:\.\d+)?)/);
    if (forceMatch) {
      return {
        type: 'force',
        params: {
          mass: parseFloat(forceMatch[1]),
          acceleration: parseFloat(forceMatch[2])
        }
      };
    }

    // Velocity calculation: v = u + at
    const velocityMatch = lowerQuestion.match(/(?:velocity|скорость|скорость).*(?:initial|начальная).*?(\d+(?:\.\d+)?).*(?:acceleration|ускорение).*?(\d+(?:\.\d+)?).*(?:time|время).*?(\d+(?:\.\d+)?)/);
    if (velocityMatch) {
      return {
        type: 'velocity',
        params: {
          initialVelocity: parseFloat(velocityMatch[1]),
          acceleration: parseFloat(velocityMatch[2]),
          time: parseFloat(velocityMatch[3])
        }
      };
    }

    // Kinetic energy: KE = ½mv²
    const kineticMatch = lowerQuestion.match(/(?:kinetic energy|кинетическая энергия).*(?:mass|масса).*?(\d+(?:\.\d+)?).*(?:velocity|скорость).*?(\d+(?:\.\d+)?)/);
    if (kineticMatch) {
      return {
        type: 'kinetic-energy',
        params: {
          mass: parseFloat(kineticMatch[1]),
          velocity: parseFloat(kineticMatch[2])
        }
      };
    }

    // Gravitational force: F = G(m₁m₂)/r²
    const gravityMatch = lowerQuestion.match(/(?:gravitational|гравитационная).*(?:force|сила).*(?:mass|масса).*?(\d+(?:\.\d+)?).*(?:mass|масса).*?(\d+(?:\.\d+)?).*(?:distance|расстояние).*?(\d+(?:\.\d+)?)/);
    if (gravityMatch) {
      return {
        type: 'gravitational-force',
        params: {
          mass1: parseFloat(gravityMatch[1]),
          mass2: parseFloat(gravityMatch[2]),
          distance: parseFloat(gravityMatch[3])
        }
      };
    }

    // Ohm's Law: V = IR, I = V/R, R = V/I
    const ohmsMatch = lowerQuestion.match(/(?:ohm|ом).*(?:law|закон).*(?:voltage|напряжение).*?(\d+(?:\.\d+)?).*(?:current|ток).*?(\d+(?:\.\d+)?)/);
    if (ohmsMatch) {
      return {
        type: 'ohms-law',
        params: {
          voltage: parseFloat(ohmsMatch[1]),
          current: parseFloat(ohmsMatch[2])
        }
      };
    }

    return null;
  }

  // Execute physics calculation
  async calculate(calculation: PhysicsCalculation): Promise<string> {
    try {
      switch (calculation.type) {
        case 'force':
          return await this.client.calculateForce(
            calculation.params.mass,
            calculation.params.acceleration
          );

        case 'velocity':
          return await this.client.calculateVelocity(
            calculation.params.initialVelocity,
            calculation.params.acceleration,
            calculation.params.time
          );

        case 'kinetic-energy':
          return await this.client.calculateKineticEnergy(
            calculation.params.mass,
            calculation.params.velocity
          );

        case 'gravitational-force':
          return await this.client.calculateGravitationalForce(
            calculation.params.mass1,
            calculation.params.mass2,
            calculation.params.distance
          );

        case 'ohms-law':
          return await this.client.calculateOhmsLaw(calculation.params);

        default:
          return "❌ Unknown calculation type";
      }
    } catch (error) {
      console.error('Physics calculation error:', error);
      return `❌ Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  // Get physics resources
  async getPhysicsResource(type: 'newtons-laws' | 'kinematic-equations'): Promise<string> {
    try {
      switch (type) {
        case 'newtons-laws':
          return await this.client.getNewtonsLaws();
        case 'kinematic-equations':
          return await this.client.getKinematicEquations();
        default:
          return "❌ Unknown resource type";
      }
    } catch (error) {
      console.error('Physics resource error:', error);
      return `❌ Resource error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  // Check if question contains physics calculations
  static isPhysicsQuestion(question: string): boolean {
    const physicsKeywords = [
      'force', 'сила', 'масса', 'mass', 'acceleration', 'ускорение',
      'velocity', 'скорость', 'kinetic energy', 'кинетическая энергия',
      'gravitational', 'гравитационная', 'ohm', 'ом', 'law', 'закон',
      'newton', 'ньютон', 'физика', 'physics', 'расчет', 'calculate'
    ];

    const lowerQuestion = question.toLowerCase();
    return physicsKeywords.some(keyword => lowerQuestion.includes(keyword));
  }

  // Get available tools
  async getAvailableTools(): Promise<any[]> {
    try {
      return await this.client.getAvailableTools();
    } catch (error) {
      console.error('Failed to get tools:', error);
      return [];
    }
  }
}

export const physicsCalculator = new PhysicsCalculator();


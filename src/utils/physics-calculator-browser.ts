// Browser-compatible physics calculator without MCP
export interface PhysicsCalculation {
  type: 'force' | 'velocity' | 'kinetic-energy' | 'gravitational-force' | 'ohms-law';
  params: any;
  result?: string;
  error?: string;
}

export class PhysicsCalculator {
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
    const velocityMatch = lowerQuestion.match(/(?:velocity|скорость).*(?:initial|начальная).*?(\d+(?:\.\d+)?).*(?:acceleration|ускорение).*?(\d+(?:\.\d+)?).*(?:time|время).*?(\d+(?:\.\d+)?)/);
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
          return this.calculateForce(
            calculation.params.mass,
            calculation.params.acceleration
          );

        case 'velocity':
          return this.calculateVelocity(
            calculation.params.initialVelocity,
            calculation.params.acceleration,
            calculation.params.time
          );

        case 'kinetic-energy':
          return this.calculateKineticEnergy(
            calculation.params.mass,
            calculation.params.velocity
          );

        case 'gravitational-force':
          return this.calculateGravitationalForce(
            calculation.params.mass1,
            calculation.params.mass2,
            calculation.params.distance
          );

        case 'ohms-law':
          return this.calculateOhmsLaw(calculation.params);

        default:
          return "❌ Unknown calculation type";
      }
    } catch (error) {
      console.error('Physics calculation error:', error);
      return `❌ Calculation error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  // Force calculation: F = ma
  private calculateForce(mass: number, acceleration: number): string {
    const force = mass * acceleration;
    return `🔬 Force Calculation:\n\nF = ma\nF = ${mass} kg × ${acceleration} m/s²\nF = ${force} N\n\nForce = ${force} Newtons`;
  }

  // Velocity calculation: v = u + at
  private calculateVelocity(initialVelocity: number, acceleration: number, time: number): string {
    const finalVelocity = initialVelocity + (acceleration * time);
    return `🏃 Velocity Calculation:\n\nv = u + at\nv = ${initialVelocity} m/s + (${acceleration} m/s² × ${time} s)\nv = ${initialVelocity} + ${acceleration * time}\nv = ${finalVelocity} m/s\n\nFinal velocity = ${finalVelocity} m/s`;
  }

  // Kinetic energy: KE = ½mv²
  private calculateKineticEnergy(mass: number, velocity: number): string {
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    return `⚡ Kinetic Energy Calculation:\n\nKE = ½mv²\nKE = ½ × ${mass} kg × (${velocity} m/s)²\nKE = 0.5 × ${mass} × ${velocity * velocity}\nKE = ${kineticEnergy} J\n\nKinetic Energy = ${kineticEnergy} Joules`;
  }

  // Gravitational force: F = G(m₁m₂)/r²
  private calculateGravitationalForce(mass1: number, mass2: number, distance: number): string {
    const G = 6.67430e-11; // Gravitational constant
    const force = (G * mass1 * mass2) / (distance * distance);
    return `🌍 Gravitational Force Calculation:\n\nF = G(m₁m₂)/r²\nF = ${G} × (${mass1} kg × ${mass2} kg) / (${distance} m)²\nF = ${G} × ${mass1 * mass2} / ${distance * distance}\nF = ${force} N\n\nGravitational Force = ${force} Newtons`;
  }

  // Ohm's Law: V = IR, I = V/R, R = V/I
  private calculateOhmsLaw(params: { voltage?: number; current?: number; resistance?: number }): string {
    const { voltage, current, resistance } = params;
    
    if (voltage && current && !resistance) {
      // Calculate resistance: R = V/I
      const calculatedResistance = voltage / current;
      return `🔌 Resistance Calculation (Ohm's Law):\n\nR = V/I\nR = ${voltage} V / ${current} A\nR = ${calculatedResistance} Ω\n\nResistance = ${calculatedResistance} Ohms`;
    } else if (voltage && resistance && !current) {
      // Calculate current: I = V/R
      const calculatedCurrent = voltage / resistance;
      return `⚡ Current Calculation (Ohm's Law):\n\nI = V/R\nI = ${voltage} V / ${resistance} Ω\nI = ${calculatedCurrent} A\n\nCurrent = ${calculatedCurrent} Amperes`;
    } else if (current && resistance && !voltage) {
      // Calculate voltage: V = IR
      const calculatedVoltage = current * resistance;
      return `🔋 Voltage Calculation (Ohm's Law):\n\nV = I × R\nV = ${current} A × ${resistance} Ω\nV = ${calculatedVoltage} V\n\nVoltage = ${calculatedVoltage} Volts`;
    } else {
      return `❌ Please provide exactly 2 values to calculate the third using Ohm's Law.\n\nAvailable calculations:\n• R = V/I (calculate resistance)\n• I = V/R (calculate current)\n• V = I × R (calculate voltage)`;
    }
  }

  // Get physics resources
  async getPhysicsResource(type: 'newtons-laws' | 'kinematic-equations'): Promise<string> {
    switch (type) {
      case 'newtons-laws':
        return `📚 Newton's Laws of Motion:

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
• Everyday motion`;

      case 'kinematic-equations':
        return `🏃 Kinematic Equations:

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
• s = displacement (m)`;

      default:
        return "❌ Unknown resource type";
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

  // Get available tools (for compatibility)
  async getAvailableTools(): Promise<any[]> {
    return [
      { name: 'calculate-force', description: 'Calculate force using F = ma' },
      { name: 'calculate-velocity', description: 'Calculate velocity using v = u + at' },
      { name: 'calculate-kinetic-energy', description: 'Calculate kinetic energy using KE = ½mv²' },
      { name: 'calculate-gravitational-force', description: 'Calculate gravitational force using F = G(m₁m₂)/r²' },
      { name: 'calculate-ohms-law', description: 'Calculate voltage, current, or resistance using Ohm\'s Law' }
    ];
  }
}

export const physicsCalculator = new PhysicsCalculator();


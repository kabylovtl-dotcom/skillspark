# 🧮 Physics Calculator Integration

## Overview
ChatGPT теперь поддерживает автоматические физические расчеты! Система распознает физические вопросы и выполняет точные вычисления с пошаговыми решениями.

## 🔧 Supported Calculations

### 1. Force Calculation (F = ma)
**Example questions:**
- "Рассчитай силу: масса 5кг, ускорение 3м/с²"
- "Calculate force: mass 5kg, acceleration 3m/s²"
- "Силаны эсепте: масса 5кг, ылдамдык 3м/с²"

**Formula:** F = ma

### 2. Velocity Calculation (v = u + at)
**Example questions:**
- "Рассчитай скорость: начальная скорость 10м/с, ускорение 2м/с², время 5с"
- "Calculate velocity: initial 10m/s, acceleration 2m/s², time 5s"

**Formula:** v = u + at

### 3. Kinetic Energy (KE = ½mv²)
**Example questions:**
- "Рассчитай кинетическую энергию: масса 2кг, скорость 10м/с"
- "Calculate kinetic energy: mass 2kg, velocity 10m/s"

**Formula:** KE = ½mv²

### 4. Gravitational Force (F = G(m₁m₂)/r²)
**Example questions:**
- "Рассчитай гравитационную силу: масса 1000кг, масса 2000кг, расстояние 10м"
- "Calculate gravitational force: mass1 1000kg, mass2 2000kg, distance 10m"

**Formula:** F = G(m₁m₂)/r²

### 5. Ohm's Law (V = IR, I = V/R, R = V/I)
**Example questions:**
- "Закон Ома: напряжение 12В, ток 2А"
- "Ohm's law: voltage 12V, current 2A"

**Formulas:**
- R = V/I (calculate resistance)
- I = V/R (calculate current)  
- V = I × R (calculate voltage)

## 📚 Physics Resources

### Newton's Laws
Ask: "Объясни законы Ньютона" / "Explain Newton's laws"

### Kinematic Equations
Ask: "Кинематические уравнения" / "Kinematic equations"

## 🌍 Multi-language Support

The calculator supports 3 languages:
- 🇷🇺 **Russian** - основной язык
- 🇰🇬 **Kyrgyz** - кыргызский язык
- 🇺🇸 **English** - английский язык

## 🚀 How to Use

1. **Open ChatGPT:** Go to http://localhost:8080/chatgpt
2. **Ask physics questions:** Use any of the example questions above
3. **Get instant calculations:** The system will automatically detect physics questions and provide step-by-step solutions
4. **Use quick prompts:** Click on the suggested physics calculations

## 💡 Tips

- **Be specific with numbers:** Include exact values in your questions
- **Use keywords:** Include words like "force", "масса", "acceleration", etc.
- **Ask for explanations:** Request detailed step-by-step solutions
- **Try different formats:** The system recognizes various question formats

## 🔍 Example Interactions

**User:** "Рассчитай силу: масса 5кг, ускорение 3м/с²"

**AI Response:**
```
🔬 Force Calculation:

F = ma
F = 5 kg × 3 m/s²
F = 15 N

Force = 15 Newtons
```

**User:** "Explain Newton's laws"

**AI Response:**
```
📚 Newton's Laws of Motion:

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
• Everyday motion
```

## 🛠️ Technical Details

- **Browser-compatible:** No Node.js dependencies in the browser
- **Real-time calculations:** Instant responses with step-by-step solutions
- **Error handling:** Graceful fallback to ChatGPT for complex questions
- **Multi-language parsing:** Recognizes physics questions in 3 languages
- **Formula validation:** Ensures correct input parameters

## 🎯 Future Enhancements

- More physics formulas (thermodynamics, optics, etc.)
- Unit conversions
- Graph plotting
- Interactive simulations
- Advanced mathematical functions

---

**Ready to calculate?** Try asking: "Рассчитай силу: масса 10кг, ускорение 5м/с²" 🚀


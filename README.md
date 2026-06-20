# 🔍 Find-S Algorithm Visualizer

An **interactive, step-by-step visualization** of the Find-S (specific hypothesis) algorithm for concept learning, built with React, TypeScript, and Tailwind CSS.

![Find-S Algorithm Visualization](https://img.shields.io/badge/React-19-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌐 Live Demo

[View Live Demo](https://find-s.vercel.app/) 
## 📖 Overview

This project provides a beautiful, interactive dashboard that demonstrates how the **Find-S algorithm** learns the most specific hypothesis from training examples. It visualizes the classic "EnjoySport" dataset and shows exactly how the hypothesis evolves with each positive example.

### What is Find-S?

Find-S is a **concept learning algorithm** that:
1. Initializes the hypothesis with the first positive example
2. Generalizes it by replacing differing attributes with `?` when encountering subsequent positive examples
3. Ignores negative examples completely
4. Returns the most specific hypothesis consistent with all positive examples

## ✨ Features

### 🎯 Interactive Visualization
- **Step-by-step execution** with play/pause/step controls
- **Live hypothesis state** showing all 6 attributes in real-time
- **Dataset table** with clickable rows to jump to any example
- **Color-coded events** (initialization, generalization, skipped negatives)
- **Animated transitions** highlighting attribute changes

### 📊 Rich UI Components
- **Current example panel** showing attribute values
- **Hypothesis cards** with visual indicators for wildcards (`?`)
- **Execution log** tracing each algorithm step
- **Progress bar** showing completion percentage
- **Code preview** with the original Python implementation

### 🎨 Beautiful Design
- **Warm amber/orange theme** evoking the "finding" concept
- **Dark mode** with frosted glass effects
- **Responsive layout** that works on mobile and desktop
- **Smooth animations** and hover effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/find-s-visualizer.git
cd find-s-visualizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 📚 How It Works

### The Dataset

The classic **EnjoySport dataset** contains 4 examples with 6 attributes:

| # | Sky | AirTemp | Humidity | Wind | Water | Forecast | Target |
|---|-----|---------|----------|------|-------|----------|--------|
| 0 | Sunny | Warm | Normal | Strong | Warm | Same | Yes |
| 1 | Sunny | Warm | High | Strong | Warm | Same | Yes |
| 2 | Rainy | Cold | High | Strong | Warm | Change | No |
| 3 | Sunny | Warm | High | Strong | Cool | Change | Yes |

### Algorithm Execution

1. **Step 1 (Initialize)**: First positive example (E0)
   ```
   h = [Sunny, Warm, Normal, Strong, Warm, Same]
   ```

2. **Step 2 (Generalize)**: Second positive example (E1) differs in `Humidity`
   ```
   h = [Sunny, Warm, ?, Strong, Warm, Same]
   ```

3. **Step 3 (Skip)**: Negative example (E2) is ignored
   ```
   h = [Sunny, Warm, ?, Strong, Warm, Same]
   ```

4. **Step 4 (Generalize)**: Third positive example (E3) differs in `Water` and `Forecast`
   ```
   h = [Sunny, Warm, ?, Strong, ?, ?]
   ```

### Final Hypothesis

The algorithm learns that to **enjoy the sport**, we need:
- **Sunny** sky
- **Warm** air temperature
- **Any** humidity level
- **Strong** wind
- **Any** water temperature
- **Any** forecast

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
find-s-visualizer/
├── src/
│   ├── data/
│   │   └── findsData.ts       # Dataset and algorithm logic
│   ├── App.tsx                # Main dashboard component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

## 🎓 Educational Value

This visualization helps students understand:

- **Concept learning** in machine learning
- How **hypothesis spaces** work
- The difference between **specific** and **general** hypotheses
- Why Find-S is **sound but not complete**
- The importance of **consistent training data**

## 🔬 Algorithm Details

### Time Complexity
**O(m · n)** where:
- `m` = number of training examples
- `n` = number of attributes

### Space Complexity
**O(n)** - stores a single hypothesis vector

### Limitations
- Cannot handle **noisy data** (misclassified examples)
- Only considers **positive examples** (ignores negative examples)
- Assumes **consistent training data**

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Tom Mitchell's **Machine Learning** textbook (1997)
- Dataset from the classic **EnjoySport** example
- Built with modern web technologies

## 📬 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for educational purposes**

*Understanding machine learning through beautiful visualizations*

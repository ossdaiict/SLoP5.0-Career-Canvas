# CareerCanvas - Resume Builder with Canvas API

A beginner-friendly web application built for SLOP 5.0 by DSC DA-IICT participants.

## What is This Project?

CareerCanvas is a modern resume builder that showcases the power of HTML5 Canvas API. It's designed as a learning project for beginners participating in SLOP (Student Learning Open Project) 5.0, organized by Developer Student Club at DA-IICT.

## Features

### 1. Resume Builder
- Create professional resumes with an intuitive step-by-step interface
- Add personal information, education, work experience, skills, and projects
- Live preview using Canvas API
- Clean and organized form sections


### 2. Landing Page
- Welcome page with project information
- Overview of features and capabilities
- Navigation to all sections

## Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Graphics**: HTML5 Canvas API
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
project/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header/         # Navigation header
│   │   ├── Footer/         # Page footer
│   │   ├── ResumeBuilder/  # Resume form components
│   │   └── PreviewSection/ # Canvas-based preview
│   ├── pages/              # Main page components
│   │   ├── Landing.jsx     # Home/landing page
│   │   ├── Builder.jsx     # Resume builder page
│   │   └── CanvasPage.jsx  # Canvas lab page
│   ├── layouts/            # Layout components
│   ├── styles/             # Global styles
│   └── App.jsx             # Main app component
├── public/                 # Static assets
└── package.json           # Project dependencies
```

## Learning Resources

### Understanding Canvas API

The Canvas API provides a way to draw graphics via JavaScript and the HTML `<canvas>` element. In this project, you'll see Canvas API used in two main ways:

1. **Resume Preview**: Rendering text and layouts programmatically

## For Beginners

This project is structured to be beginner-friendly:

1. **Modular Components**: Each component has a single responsibility
2. **CSS Modules**: Scoped styling to avoid conflicts
3. **Clean Code**: Well-organized and readable code structure
4. **Comments**: Key sections are commented for understanding

## Contributing

This is a learning project for SLOP 5.0 participants. Feel free to:

- Add new features
- Improve existing functionality
- Enhance the UI/UX
- Add more Canvas experiments
- Optimize code

## What You Can Learn

- React fundamentals (components, hooks, state management)
- React Router for navigation
- HTML5 Canvas API basics
- CSS Modules and responsive design
- Project structure and organization
- Form handling in React

## Future Enhancements

Ideas for expanding this project:

- Export resume as PDF
- Multiple resume templates
- More Canvas drawing tools
- Save/load resume data
- Animations in Canvas Lab
- Color themes

## About SLOP 5.0

SLOP (Student Learning Open Project) is an initiative by Developer Student Club at DA-IICT where students collaborate on real-world projects to learn web development through hands-on experience.

## License

This project is created for educational purposes as part of SLOP 5.0.

---

Built with ❤️ by SLOP 5.0 participants at DSC DA-IICT

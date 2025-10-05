#!/bin/bash

echo "🎯 Productivity Harnesser - Installation Script"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create startup script
cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Productivity Harnesser..."
echo "Open your browser and go to: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
npm start
EOF

chmod +x start.sh

echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "To start the app:"
echo "  ./start.sh"
echo ""
echo "Or manually:"
echo "  npm start"
echo ""
echo "Then open your browser to: http://localhost:3000"
echo ""
echo "📱 Mobile Installation:"
echo "1. Open the app in your mobile browser"
echo "2. Look for 'Add to Home Screen' option"
echo "3. Install as a native app"
echo ""
echo "🎯 Happy focusing!"

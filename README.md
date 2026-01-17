# 🎬 Universal Media Player

A web-based media player that works on all devices including TV browsers. Play videos, audio files, and view images from your local device with an intuitive, TV-friendly interface.

## ✨ Features

- **Multiple Format Support**
  - Video: MP4, WebM, OGG, MKV, AVI, MOV, WMV, FLV, M4V
  - Audio: MP3, WAV, OGG, FLAC, AAC, M4A, WMA
  - Images: JPG, PNG, GIF, WebP, SVG, BMP

- **Playlist Management**
  - Add multiple files at once
  - Remove individual items
  - Click to play any item
  - Auto-play next item

- **Playback Controls**
  - Previous/Next navigation
  - Play/Pause toggle
  - Fullscreen mode
  - Auto-play on media end

- **Keyboard Shortcuts**
  - **Space** - Play/Pause
  - **← →** - Previous/Next track
  - **F** - Toggle fullscreen
  - **M** - Mute/Unmute
  - **↑ ↓** - Volume Up/Down

- **TV Browser Optimized**
  - Large, easy-to-click buttons
  - Remote control navigation support
  - Focus indicators for TV navigation
  - Responsive design for all screen sizes

- **Drag & Drop Support**
  - Simply drag files into the browser window

## 🚀 Getting Started

### Quick Start

1. Open `index.html` in any modern web browser
2. Click "Select Media Files" or drag files into the window
3. Click on any file in the playlist to start playing
4. Use the controls or keyboard shortcuts to navigate

### Using on TV Browser

1. Transfer the files to a USB drive or host on a local web server
2. Open the `index.html` file in your TV's browser
3. Use your TV remote to navigate and select files
4. Enjoy your media on the big screen!

### Hosting Locally

To access from other devices on your network:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server installed)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then access at: `http://your-local-ip:8000`

## 📁 Project Structure

```
Mediaplayer/
├── index.html       # Main HTML structure
├── styles.css       # Styling and responsive design
├── script.js        # Media player functionality
└── README.md        # This file
```

## 🎨 Customization

You can easily customize the appearance by editing `styles.css`:

- Change color schemes by modifying the gradient values
- Adjust button sizes for different screen sizes
- Modify the layout and spacing
- Add custom themes

## 🔧 Technical Details

- Pure HTML5, CSS3, and vanilla JavaScript (no dependencies)
- Uses HTML5 Media APIs for playback
- File API for local file handling
- Fullscreen API for immersive viewing
- Object URLs for efficient file handling

## 🌐 Browser Compatibility

Works on all modern browsers including:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Opera
- Smart TV browsers (Samsung, LG, Sony, etc.)

## 📝 Notes

- All media files are processed locally in your browser
- No files are uploaded to any server
- Supported formats depend on browser codec support
- Some older TV browsers may have limited format support

## 🔒 Privacy

This application runs entirely in your browser. No data is transmitted to any server, and no files leave your device.

## 🐛 Troubleshooting

**Media won't play:**
- Check if your browser supports the file format
- Try converting to a more compatible format (MP4 for video, MP3 for audio)

**Remote control not working on TV:**
- Ensure JavaScript is enabled in your TV browser
- Try using the on-screen controls
- Some TV browsers may have limited JavaScript support

**Performance issues:**
- Try playing smaller files
- Close other applications
- Use lower resolution videos

## 📄 License

Free to use and modify for personal and commercial projects.

## 🙏 Contributing

Feel free to fork and improve this project!

---

Enjoy your media! 🎉
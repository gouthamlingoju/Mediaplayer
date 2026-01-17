// Media Player State
let mediaFiles = [];
let currentIndex = 0;

// DOM Elements
const fileInput = document.getElementById('fileInput');
const fileButton = document.getElementById('fileButton');
const clearButton = document.getElementById('clearButton');
const playerSection = document.getElementById('playerSection');
const playlistSection = document.getElementById('playlistSection');
const playlist = document.getElementById('playlist');
const playlistCount = document.getElementById('playlistCount');

const videoContainer = document.getElementById('videoContainer');
const audioContainer = document.getElementById('audioContainer');
const imageContainer = document.getElementById('imageContainer');

const videoPlayer = document.getElementById('videoPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const imageViewer = document.getElementById('imageViewer');

const prevBtn = document.getElementById('prevBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');

const currentFileIndex = document.getElementById('currentFileIndex');
const audioTitle = document.getElementById('audioTitle');

// Event Listeners
fileInput.addEventListener('change', handleFileSelect);
fileButton.addEventListener('click', () => fileInput.click());
clearButton.addEventListener('click', clearAll);

prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
playPauseBtn.addEventListener('click', togglePlayPause);
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Auto-play next when current media ends
videoPlayer.addEventListener('ended', playNext);
audioPlayer.addEventListener('ended', playNext);

// Handle File Selection
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    // Add new files to the playlist
    files.forEach(file => {
        if (isMediaFile(file)) {
            mediaFiles.push(file);
        }
    });
    
    if (mediaFiles.length > 0) {
        updatePlaylist();
        playerSection.style.display = 'block';
        playlistSection.style.display = 'block';
        
        // Play the first file if this is the first batch
        if (currentIndex === 0 || files.length === mediaFiles.length) {
            playMedia(0);
        }
    }
    
    // Reset file input
    fileInput.value = '';
}

// Check if file is a supported media type
function isMediaFile(file) {
    const mediaTypes = /\.(mp4|webm|ogg|ogv|mkv|avi|mov|wmv|flv|m4v|mp3|wav|ogg|flac|aac|m4a|wma|jpg|jpeg|png|gif|webp|svg|bmp)$/i;
    return mediaTypes.test(file.name);
}

// Get media type
function getMediaType(file) {
    const videoTypes = /\.(mp4|webm|ogg|ogv|mkv|avi|mov|wmv|flv|m4v)$/i;
    const audioTypes = /\.(mp3|wav|ogg|flac|aac|m4a|wma)$/i;
    const imageTypes = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
    
    if (videoTypes.test(file.name)) return 'video';
    if (audioTypes.test(file.name)) return 'audio';
    if (imageTypes.test(file.name)) return 'image';
    return 'unknown';
}

// Get icon for media type
function getMediaIcon(type) {
    switch(type) {
        case 'video': return '🎬';
        case 'audio': return '🎵';
        case 'image': return '🖼️';
        default: return '📄';
    }
}

// Update Playlist UI
function updatePlaylist() {
    playlist.innerHTML = '';
    playlistCount.textContent = mediaFiles.length;
    
    mediaFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.tabIndex = 0;
        if (index === currentIndex) {
            li.classList.add('active');
        }
        
        const type = getMediaType(file);
        const icon = getMediaIcon(type);
        
        li.innerHTML = `
            <span class="playlist-item-icon">${icon}</span>
            <span class="playlist-item-name">${file.name}</span>
            <button class="playlist-item-remove" onclick="removeFromPlaylist(${index})">✕</button>
        `;
        
        li.addEventListener('click', (e) => {
            if (!e.target.classList.contains('playlist-item-remove')) {
                playMedia(index);
            }
        });
        
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playMedia(index);
            }
        });
        
        playlist.appendChild(li);
    });
}

// Play Media
function playMedia(index) {
    if (index < 0 || index >= mediaFiles.length) return;
    
    currentIndex = index;
    const file = mediaFiles[currentIndex];
    const type = getMediaType(file);
    const url = URL.createObjectURL(file);
    
    // Hide all players
    videoContainer.style.display = 'none';
    audioContainer.style.display = 'none';
    imageContainer.style.display = 'none';
    
    // Reset previous URLs
    if (videoPlayer.src) URL.revokeObjectURL(videoPlayer.src);
    if (audioPlayer.src) URL.revokeObjectURL(audioPlayer.src);
    if (imageViewer.src) URL.revokeObjectURL(imageViewer.src);
    
    // Play appropriate media type
    switch(type) {
        case 'video':
            videoContainer.style.display = 'block';
            videoPlayer.src = url;
            videoPlayer.load();
            videoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
            break;
            
        case 'audio':
            audioContainer.style.display = 'block';
            audioPlayer.src = url;
            audioTitle.textContent = file.name;
            audioPlayer.load();
            audioPlayer.play().catch(e => console.log('Autoplay prevented:', e));
            break;
            
        case 'image':
            imageContainer.style.display = 'block';
            imageViewer.src = url;
            imageViewer.alt = file.name;
            break;
    }
    
    // Update UI
    currentFileIndex.textContent = `${file.name} (${currentIndex + 1}/${mediaFiles.length})`;
    updatePlaylist();
}

// Navigation Functions
function playPrevious() {
    if (currentIndex > 0) {
        playMedia(currentIndex - 1);
    } else {
        playMedia(mediaFiles.length - 1); // Loop to last
    }
}

function playNext() {
    if (currentIndex < mediaFiles.length - 1) {
        playMedia(currentIndex + 1);
    } else {
        playMedia(0); // Loop to first
    }
}

// Play/Pause Toggle
function togglePlayPause() {
    const type = getMediaType(mediaFiles[currentIndex]);
    
    if (type === 'video') {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    } else if (type === 'audio') {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }
}

// Fullscreen Toggle
function toggleFullscreen() {
    const type = getMediaType(mediaFiles[currentIndex]);
    let element;
    
    if (type === 'video') {
        element = videoContainer;
    } else if (type === 'image') {
        element = imageContainer;
    } else {
        element = document.documentElement;
    }
    
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Remove from Playlist
function removeFromPlaylist(index) {
    if (mediaFiles.length === 1) {
        clearAll();
        return;
    }
    
    // Revoke URL if it's the current file
    if (index === currentIndex) {
        const type = getMediaType(mediaFiles[index]);
        if (type === 'video' && videoPlayer.src) {
            URL.revokeObjectURL(videoPlayer.src);
            videoPlayer.src = '';
        } else if (type === 'audio' && audioPlayer.src) {
            URL.revokeObjectURL(audioPlayer.src);
            audioPlayer.src = '';
        } else if (type === 'image' && imageViewer.src) {
            URL.revokeObjectURL(imageViewer.src);
            imageViewer.src = '';
        }
    }
    
    mediaFiles.splice(index, 1);
    
    // Adjust current index if needed
    if (index < currentIndex) {
        currentIndex--;
    } else if (index === currentIndex) {
        if (currentIndex >= mediaFiles.length) {
            currentIndex = mediaFiles.length - 1;
        }
        playMedia(currentIndex);
    }
    
    updatePlaylist();
}

// Clear All
function clearAll() {
    // Revoke all object URLs
    if (videoPlayer.src) URL.revokeObjectURL(videoPlayer.src);
    if (audioPlayer.src) URL.revokeObjectURL(audioPlayer.src);
    if (imageViewer.src) URL.revokeObjectURL(imageViewer.src);
    
    // Reset state
    mediaFiles = [];
    currentIndex = 0;
    
    // Reset players
    videoPlayer.src = '';
    audioPlayer.src = '';
    imageViewer.src = '';
    
    // Hide sections
    playerSection.style.display = 'none';
    playlistSection.style.display = 'none';
    
    // Clear playlist
    playlist.innerHTML = '';
    playlistCount.textContent = '0';
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Only handle shortcuts if media is loaded
    if (mediaFiles.length === 0) return;
    
    const type = getMediaType(mediaFiles[currentIndex]);
    const activePlayer = type === 'video' ? videoPlayer : audioPlayer;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            togglePlayPause();
            break;
            
        case 'ArrowLeft':
            e.preventDefault();
            playPrevious();
            break;
            
        case 'ArrowRight':
            e.preventDefault();
            playNext();
            break;
            
        case 'f':
        case 'F':
            e.preventDefault();
            toggleFullscreen();
            break;
            
        case 'm':
        case 'M':
            e.preventDefault();
            if (type === 'video' || type === 'audio') {
                activePlayer.muted = !activePlayer.muted;
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (type === 'video' || type === 'audio') {
                activePlayer.volume = Math.min(1, activePlayer.volume + 0.1);
            }
            break;
            
        case 'ArrowDown':
            e.preventDefault();
            if (type === 'video' || type === 'audio') {
                activePlayer.volume = Math.max(0, activePlayer.volume - 0.1);
            }
            break;
    }
});

// Handle file drops (drag and drop)
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
        if (isMediaFile(file)) {
            mediaFiles.push(file);
        }
    });
    
    if (mediaFiles.length > 0) {
        updatePlaylist();
        playerSection.style.display = 'block';
        playlistSection.style.display = 'block';
        
        if (currentIndex === 0 || files.length === mediaFiles.length) {
            playMedia(0);
        }
    }
});

// Focus management for TV/Remote control navigation
document.querySelectorAll('button, .file-button, .playlist-item').forEach(element => {
    element.addEventListener('focus', () => {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

console.log('Universal Media Player loaded successfully!');

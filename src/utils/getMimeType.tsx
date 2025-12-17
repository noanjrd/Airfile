export const getMimeType = (filename: string): string => {
    const ext = filename.toLowerCase().split('.').pop();
    const mimeTypes: { [key: string]: string } = {
        // Images
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'bmp': 'image/bmp',
        'ico': 'image/x-icon',
        'tiff': 'image/tiff',
        'tif': 'image/tiff',
        
        // Documents
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'txt': 'text/plain',
        'rtf': 'application/rtf',
        'odt': 'application/vnd.oasis.opendocument.text',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        
        // Programmation
        'c': 'text/x-c',
        'cpp': 'text/x-c++src',
        'cc': 'text/x-c++src',
        'cxx': 'text/x-c++src',
        'h': 'text/x-chdr',
        'hpp': 'text/x-c++hdr',
        'java': 'text/x-java-source',
        'js': 'text/javascript',
        'ts': 'text/typescript',
        'jsx': 'text/jsx',
        'tsx': 'text/tsx',
        'py': 'text/x-python',
        'php': 'text/x-php',
        'rb': 'text/x-ruby',
        'go': 'text/x-go',
        'rs': 'text/x-rust',
        'swift': 'text/x-swift',
        'kt': 'text/x-kotlin',
        'cs': 'text/x-csharp',
        'vb': 'text/x-vb',
        'r': 'text/x-r',
        'pl': 'text/x-perl',
        'sh': 'text/x-shellscript',
        'bash': 'text/x-shellscript',
        'ps1': 'text/x-powershell',
        
        // Web
        'html': 'text/html',
        'htm': 'text/html',
        'css': 'text/css',
        'json': 'application/json',
        'xml': 'application/xml',
        'yaml': 'text/yaml',
        'yml': 'text/yaml',
        
        // Audio
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        'flac': 'audio/flac',
        'aac': 'audio/aac',
        'm4a': 'audio/mp4',
        'wma': 'audio/x-ms-wma',
        
        // Video
        'mp4': 'video/mp4',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'wmv': 'video/x-ms-wmv',
        'flv': 'video/x-flv',
        'webm': 'video/webm',
        'mkv': 'video/x-matroska',
        '3gp': 'video/3gpp',
        
        // Archives
        'zip': 'application/zip',
        'rar': 'application/vnd.rar',
        '7z': 'application/x-7z-compressed',
        'tar': 'application/x-tar',
        'gz': 'application/gzip',
        'bz2': 'application/x-bzip2',
        'xz': 'application/x-xz',
        
        // Exécutables
        'exe': 'application/vnd.microsoft.portable-executable',
        'msi': 'application/x-msdownload',
        'deb': 'application/vnd.debian.binary-package',
        'rpm': 'application/x-rpm',
        'dmg': 'application/x-apple-diskimage',
        'app': 'application/octet-stream',
        
        // Données et Configuration
        'csv': 'text/csv',
        'ini': 'text/plain',
        'cfg': 'text/plain',
        'conf': 'text/plain',
        'log': 'text/plain',
        'md': 'text/markdown',
        'sql': 'application/sql',
        'db': 'application/x-sqlite3',
        'sqlite': 'application/x-sqlite3',
        'sqlite3': 'application/x-sqlite3',
        
        // Fonts
        'ttf': 'font/ttf',
        'otf': 'font/otf',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'eot': 'application/vnd.ms-fontobject',
        
        // Design
        'psd': 'image/vnd.adobe.photoshop',
        'ai': 'application/postscript',
        'eps': 'application/postscript',
        'sketch': 'application/octet-stream',
        'fig': 'application/octet-stream',
        
        // Autres
        'iso': 'application/x-iso9660-image',
        'torrent': 'application/x-bittorrent',
        'apk': 'application/vnd.android.package-archive',
        'ipa': 'application/octet-stream'
    };
    
    return mimeTypes[ext || ''] || 'application/octet-stream';
};
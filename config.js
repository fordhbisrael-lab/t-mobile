// Environment configuration for running on vscode.dev or vscode.com
const ENV_CONFIG = {
  // Detect if running on vscode.dev
  isVSCodeDev: () => {
    return window.location.hostname.includes('vscode.dev');
  },

  // Detect if running on vscode.com
  isVSCodeCom: () => {
    return window.location.hostname.includes('vscode.com');
  },

  // Get the base path based on environment
  getBasePath: () => {
    const isVSCode = ENV_CONFIG.isVSCodeDev() || ENV_CONFIG.isVSCodeCom();

    if (isVSCode) {
      // For vscode.dev/vscode.com, use the repository structure
      // Typically: /github/{owner}/{repo}/
      const pathParts = window.location.pathname.split('/').filter(p => p);

      // If path contains github, use the first 3 parts (github/owner/repo)
      if (pathParts.includes('github')) {
        const githubIndex = pathParts.indexOf('github');
        return '/' + pathParts.slice(0, githubIndex + 3).join('/');
      }

      // Otherwise, use the repository name
      return '/t-mobile';
    }

    // For GitHub Pages and local development, use relative paths
    return '.';
  },

  // Get full asset path
  getAssetPath: (assetPath) => {
    const basePath = ENV_CONFIG.getBasePath();
    // Remove leading slash from assetPath if present
    const cleanAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
    return `${basePath}/${cleanAssetPath}`;
  }
};

// Make available globally
window.ENV_CONFIG = ENV_CONFIG;

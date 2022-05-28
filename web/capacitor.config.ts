import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.treasurechess.app',
  appName: 'Treasure Chess',
  webDir: 'dist',
  bundledWebRuntime: false,
  // Enable for hot-rebuilds. The PWA should be served at http://localhost:8910
  server: {
    url: 'http://10.0.2.2:8910',
    cleartext: true,
  },
}

export default config

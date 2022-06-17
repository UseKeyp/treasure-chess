import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.treasurechess.app',
  appName: 'Treasure Chess',
  webDir: 'dist',
  npmClient: 'yarn',
  bundledWebRuntime: false,
  // Enable for hot-rebuilds. The PWA should be served at http://localhost:8910
  server: {
    // hostname: '10.0.2.2:8910',
    // androidScheme: 'http',
    // url: 'http://10.0.2.2:8910',
    url: 'http://c8e9-71-228-231-146.ngrok.io',
    cleartext: true,
  },
}

export default config

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import graphqlPlugin from 'vite-plugin-graphql';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), graphqlPlugin],
});

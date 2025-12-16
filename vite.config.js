export default {
  server: {
    port: 5173,
    host: true, // Expose to network/localhost
  },
  base: '/barber-website/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        booking: 'booking.html',
      },
    },
  },
};

/** @type {import('next').NextConfig} */
const path = require('path');

//const nextConfig = 

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "@/styles/variables.scss";`,
    },
    images: {
        minimumCacheTTL: 2592000,
    },
    async headers() {
        return [
            {
              source: '/:all*(svg|jpg|png)',
              locale: false,
              headers: [
                {
                  key: 'Cache-Control',
                  value: 'public, max-age=604800, must-revalidate',
                }
              ],
            },
          ]
    }
}

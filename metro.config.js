/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require('metro-config');

 module.exports = (async () => {
   const {
     resolver: { sourceExts, assetExts },
   } = await getDefaultConfig();

   const ajustAssetExts = () => {  
     const aux01 = assetExts.filter((ext) => ext !== 'svg')
     const aux02 = [...aux01, 'bin']
     return aux02
   }
   
   return {
     transformer: {
       babelTransformerPath: require.resolve('react-native-svg-transformer'),
       getTransformOptions: async () => ({
         transform: {
           experimentalImportSupport: false,
           inlineRequires: true,
         },
       }),
     },
     resolver: {
       assetExts: ajustAssetExts(),
       sourceExts: [...sourceExts, 'svg'],
     },
   };
})();


 
// module.exports = (async () => {
//   const {
//     resolver: { assetExts },
//   } = await getDefaultConfig();
//   return {
//     resolver: {
//       assetExts: [...assetExts, 'bin'],
//     },
//   };
// })();
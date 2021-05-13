module.exports = {
    pwa : {
        workboxPluginMode: 'GenerateSW',    // 기본값 : GenerateSW
        workboxOptions: {
            // 프리캐시 옵션
            // 캐시에 포함
            include: [/^index\.html$/, /\.css$/, /\.js$/, /^manifest\.json$/, /\.png$/],
            // 캐시에 제외. 값이 없어도 옵션은 필수로 적어줘야함
            exclude: [],    
            // runtimeCaching: [{
            //     // 런타임캐시 옵션
            // }]
        }
    }
}
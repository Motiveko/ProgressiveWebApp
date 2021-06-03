const functions = require("firebase-functions");
const admin = require("firebase-admin")
const cors = require("cors")({
    // cors 사용 허가
    origin : true   
});
// 푸시 서버 핸들러
const webpush = require("web-push")
// 서비스 계정 파일 연결
const serviceAccout = require("./motiveko-84a06-firebase-adminsdk-45e93-87f1e6d84d.json")

// 파이어베이스 서비스 계정으로 인증 실시
admin.initializeApp({
    credential: admin.credential.cert(serviceAccout),
    databaseURL: "https://motiveko-84a06-default-rtdb.firebaseio.com"
})

exports.storePushData = functions.https.onRequest((req, res) => {
    // cors를 통해 다른 도메인 접근 허용
    cors(req, res, () => {
        webpush.setVapidDetails(
            "mailto:rhehdrla@naver.com",
            // public key
            "BDd2EsaQxJSwePTOwuzZhqXv3eBrKB1cZFJnVr07Q7z4YzKQWzqcKEIGqUt3UH7IVHrubmqtFwD1kZ-JGHg6G98",
            // private key
            "tJqoP_lXWGkbrRU37-PBbGsyH_dZyTn5dI8MZvNWzK8"
        );
        admin
            .database()
            .ref("subscriptions")
            .once("value")
            .then(AllData => {
                AllData.forEach(sub => {
                    let pushConfig = {
                        endpoint: sub.val().endpoint,
                        keys: {
                            auth: sub.val().keys.auth,
                            p256dh: sub.val().keys.p256dh
                        }
                    }
                    webpush
                        .sendNotification(
                            pushConfig,
                            JSON.stringify({
                                pTitle: req.body.pMsg,
                                pMsg: req.body.pMsg
                            })
                        )
                        .catch(err => {
                            console.log("등록 안 된 사용자 제거!", err)
                            sub.ref.remove()
                        })
                })
                res.status(201).send("완료!")
            })
            .catch(err => {
                console.log("구독자 정보를 읽지 못했습니다!", err)
                res.status(500).send({
                    message: "구독자 정보를 읽지 못했습니다!",
                    error: err.response
                })
            })
    })
})

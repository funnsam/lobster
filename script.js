let query = new URLSearchParams(window.location.search);
const localization = [
    { id: "name", langs: { "en": "Lobster", "zh-HK": "龍蝦" } },
    { id: "connect_id", langs: { "en": "Your connection ID is \u200b...", "zh-HK": "你的連接號碼是: \u200b..." } },
];

for (const elm of localization) {
    document.getElementById(elm.id).innerText = elm.langs[query.get("lang") ?? "en"] ?? elm.langs["en"];
}

let peer = new Peer();
peer.on("open", (id) => {
    const conn_id = document.getElementById("connect_id");
    conn_id.innerText = conn_id.innerText.replace("\u200b...", id);
});

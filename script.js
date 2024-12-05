const localization = [
    { id: "name", langs: { "en": "Lobster", "zh-HK": "龍蝦" } },
    { id: "connect_id", langs: { "en": "Your connection ID is \u200b...", "zh-HK": "你的連接號碼是: \u200b..." } },
    { id: "connect_btn", langs: { "en": "Connect", "zh-HK": "連接" } },

    { id: "lobster", langs: { "en": "Lobster", "zh-HK": "龍蝦" } },
    { id: "poop", langs: { "en": "Poop", "zh-HK": "屎" } },
    { id: "you_eat", langs: { "en": "You eat", "zh-HK": "你食" } },
    { id: "i_eat", langs: { "en": "I eat", "zh-HK": "我食" } },
];
const id_prefix = "9d0b1970-0bcc-47a7-ae14-0ed7bf"; // with a 6 hex digit suffix

const conn_id = document.getElementById("connect_id");
const conn_btn = document.getElementById("connect_btn");
const conn_input = document.getElementById("connect_input");

let query = new URLSearchParams(window.location.search);

for (const elm of localization) {
    document.getElementById(elm.id).innerText = elm.langs[query.get("lang") ?? "en"] ?? elm.langs["en"];
}

let id = [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
let peer = new Peer(id_prefix + id);
let conn;

let current_screen = "connect";
const switch_to_screen = (s) => {
    document.getElementById(current_screen).style.display = "none";
    document.getElementById(s).style.display = "";
    current_screen = s;
};

peer.on("open", () => {
    conn_id.innerText = conn_id.innerText.replace("\u200b...", id);
});
peer.on("error", (err) => {
    alert(err.type);
    switch_to_screen("connect");
    conn = undefined;
});

const prep_play = () => {
    if (conn) {
        conn.on("open", () => {
            conn.on("data", (d) => alert(JSON.stringify(d)));
            conn.send({ yay: true, from: id });
        });

        switch_to_screen("play");
    }
};

conn_btn.onclick = () => {
    conn = peer.connect(id_prefix + conn_input.value);
    prep_play();
};

peer.on("connection", (c) => {
    conn = c;
    prep_play();
});

const app = getApp()

Page({
    data: {
        cards: [],
        currentCard: 1,
        touchStart: 0,
    },
    touchStart: function (e) {
        this.setData({ touchStart: e.touches[0].pageX });
    },
    touchEnd: function (e) {
        //小于0向左，大于0向右
        let orientation = e.changedTouches[0].pageX - this.data.touchStart;
        let currentCard = this.data.currentCard;
        this.turnTo(orientation);
    },
    onLoad: function () {
        let cards = [
            {
                "className": "card-left",
                "title": "A组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card",
                "title": "B组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-right",
                "title": "C组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-righthidden",
                "title": "D组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-righthidden",
                "title": "E组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-righthidden",
                "title": "F组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-righthidden",
                "title": "G组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },
            {
                "className": "card-righthidden",
                "title": "H组",
                "icons": [
                    "../../images/arge.png","../../images/ause.png",
                    "../../images/bele.png","../../images/brae.png",
                    "../../images/argf.png","../../images/ausf.png",
                    "../../images/belf.png","../../images/braf.png",
                    "../../images/cole.png","../../images/crce.png",
                    "../../images/croe.png","../../images/dene.png",
                    "../../images/colf.png","../../images/crcf.png",
                    "../../images/crof.png","../../images/denf.png",
                ],
            },

        ]
        this.data.cards = cards;
        this.setData({ "cards": this.data.cards });
    },
    mypre: function(e){
        this.turnTo(-1);
    },
    mynext: function(e){
        this.turnTo(1);
    },
    test: function(e){
        console.log(e);
        console.log("fuck");
    },
    turnTo: function (orientation) {
        let length = this.data.cards.length;
        let currentCard = this.data.currentCard;
        if (orientation < 0 && currentCard < length - 1) {
            if (currentCard - 1 >= 0) {
                this.data.cards[currentCard - 1].className = "card-lefthidden";   
            }
            if (currentCard + 2 <= length - 1) {
                this.data.cards[currentCard + 2].className = "card-right";
            }
            this.data.cards[currentCard].className = "card-left";
            this.data.cards[currentCard + 1].className = "card";
            this.data.currentCard += 1;
        } else if(orientation > 0 && currentCard > 0){
            if (currentCard + 1 <= length - 1) {
                this.data.cards[currentCard + 1].className = "card-righthidden";
            }
            if (currentCard - 2 >= 0) {
                this.data.cards[currentCard - 2].className = "card-left";
            }
            this.data.cards[currentCard].className = "card-right";
            this.data.cards[currentCard - 1].className = "card";
            this.data.currentCard -= 1;
        }
        this.setData({ "cards": this.data.cards });
    }
})

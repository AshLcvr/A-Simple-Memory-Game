
let app = new Vue({
    el : '#app',
    components: {
    },
    data : {
        countCard: 2,
        score : 0,
        nbCoups: 0,
        images : [],
        isStart: false,
        success: false,
        playCurrentCard: [],
        playCurrentIndex: [],
        perfect : false,
        good :   false,
        passable : false,
        bof : false,
        reStart: false
    },

    computed : {
    },

    methods : {
        startGame(){
            this.score = 0
            this.images = []
            this.isStart = !this.isStart
            this.success = false
            for ( var i=0; i < this.countCard; i++) {
                let id = this.randomInteger(304,330);
                this.images.push({id:id, open:false})
                this.images.push({id:id, open:false})
            }
            this.images = shuffle(this.images)
        },

        randomInteger(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        },

        showCard(index, idimg){
            this.images[index].open = true
            this.playCurrentCard.push(idimg)
            this.playCurrentIndex.push(index)

            if(this.playCurrentCard.length === 2 ){
                this.nbCoups++
                if(this.playCurrentCard[0] == this.playCurrentCard[1] ){
                    this.score++
                    this.playCurrentCard = []
                    this.playCurrentIndex = []
                    if(this.score == this.countCard){
                        this.isStart = false
                        this.success = true
                        if(this.score === this.nbCoups){
                            this.perfect = true
                            return
                        } else if( this.countCard+1 >= this.score && this.score <= this.countCard+2){
                            this.good = true
                            return
                        }  else if( this.countCard+3 >= this.score && this.score<= this.countCard+4){
                            this.passable = true
                            return
                        }  else if ( this.score > this.countCard+4){
                            this.bof = true
                            return
                        }
                        this.reStart = true
                    }
                }else {
                    setTimeout( ()=> {
                        this.images[this.playCurrentIndex[0]].open= false
                        this.images[this.playCurrentIndex[1]].open= false
                        this.playCurrentCard = []
                        this.playCurrentIndex = []
                    },100);

                }
            }
        },
    }

});

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
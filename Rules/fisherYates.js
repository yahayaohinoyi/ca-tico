export default class GenerateRandom {
    constructor(){

        this.outArray = []
        this.screenSize = 400
        this.numbers = []
        this.dimensions = [] 
        for (let i = 0; i < this.screenSize; i++){
            if (i < 10){
                this.numbers.push(i)
            }
            else if(i > 60 && i < 300){
                this.dimensions.push(i)
            }
            else if(i > 300){
                break
            }
        }

    }
    output(breakPoint){
        let out = this.fisherShuffle(breakPoint)
        return out
    }

    mapOut(arr){
        let obj = {
            num: null,
            id: null,
            clicked: false,
            marginLeft: null
        }
        for (let i = 0; i < arr[0].length; i++){
            obj.num = arr[0][i]
            obj.id = arr[0][i]
            obj.marginLeft = arr[1][i]
            this.outArray.push(obj)
            obj = {
                num: null,
                id: null,
                clicked: false,
                marginLeft: null
            }
        }
    }

    fisherShuffle(breakPoint){
        var out = []   
        var nums = this.fisherIteration(this.numbers, breakPoint)
        var dims = this.fisherIteration(this.dimensions, breakPoint)
        out.push(nums)
        out.push(dims)
        return out
    }

    fisherIteration(arr, breakPoint){
        let out = []
        var point_1 = 0
        var point_2 = 0
        while (point_1 < arr.length && point_1 < breakPoint){
            point_2 = Math.floor(Math.random() * (arr.length - point_1)) + point_1
            out.push(arr[point_2])
            let temp = arr[point_1]
            arr[point_1] = arr[point_2]
            arr[point_2] = temp
            point_1 += 1
        }
        return out
    }

}

// let fisher = new GenerateRandom()
// var out = fisher.output(7)
// // console.log(out)
// fisher.mapOut(out)


// module.exports = fisher

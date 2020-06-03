export default class Stack {
    constructor(){
        this.data = [];
        this.top = 0;
        this.states = []
    }
    push(element) {
        if(this.top === 0) {
            this.states.push(true)
            this.data.push(element)
            this.top = this.top + 1;
        }
        else{
            if(element > this.peek()){
                if(this.states[this.states.length - 1] === false){
                    this.states.push(false)
                }else{
                    this.states.push(true)
                }
                this.data.push(element)
                this.top = this.top + 1;
            }
            else{
                this.states.push(false)
                this.data.push(element)
                this.top = this.top + 1;
            }
        }
    }
   length() {
      return this.top;
   }
   peek() {
      return this.data[this.top-1];
   }
   isEmpty() {
     return this.top === 0;
   }
   pop() {
        if( this.isEmpty() === false ) {
        this.top = this.top -1;
        this.states.pop()
        this.data.pop(); // removes the last element
        }
   }
   getState(){
       if(this.states.length === 0){
           return false
       }
       return this.states[this.states.length - 1]
   }
   getEvery(){
        return this.states
   }
   getArr(){
       return this.data
   }

}



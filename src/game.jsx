/** @jsx React.DOM */

var Game = React.createClass({
  getInitialState: ()=>{return {};},
  startGame(words){
    this.setState({
      words:_.shuffle(words.concat(words)),
      playing:true
    });
  },
  endGame(){
    this.setState({playing:false});
  },
  render(){
    return this.state.playing ? (
      <Board endGame={this.endGame} words={this.state.words}/>
    ) : ( <Wordform startGame={this.startGame} /> );
  }
});
/** @jsx React.DOM */

var Game = React.createClass({
  getInitialState() {return {};},
  startGame(words){
    this.setState({
      words:_.shuffle(words.concat(words))
    });
  },
  endGame(){
    this.setState({words:undefined});
  },
  render(){
    return (
      this.state.words ? <Board onEndGame={this.endGame} words={this.state.words}/>
      : <Wordform onWordsEntered={this.startGame} />
    );
  }
});
/** @jsx React.DOM */

var Tile = React.createClass({
  propTypes: {
    status: React.PropTypes.string.isRequired, 
    word: React.PropTypes.string.isRequired,
    key: React.PropTypes.number.isRequired,
    clickedTile: React.PropTypes.func.isRequired
  },
  catchClick(){
    //if (this.props.status === "unturned"){
      this.props.clickedTile(this.props.key);
    //}
  },
  render(){
    return (
      <div className={'brick '+this.props.status}>
        <div className='front' onClick={this.catchClick}>?</div>
        <div className='back'>{this.props.word}</div>
      </div>
    );
  }
});
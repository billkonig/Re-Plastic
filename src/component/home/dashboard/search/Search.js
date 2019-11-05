import React, { Component } from 'react';

class Search extends Component {

    state = {
        zipCode: undefined,
        plastic: undefined
    }
    
    fieldChangeHandler(e){

    }

    // search(){
    //     if(this.state.zipCode != undefined && this.state.plastic != undefined){
    //         this.props.searchForDropOffs(this.state.zipCode, this.state.plastic)
    //     }
    // }

    

    render() {
        return (
            <div className="row">
                <div className="col col-3">
                    <select name="zipCode" onChange={this.fieldChangeHandler} className="custom-select custom-select-lg mb-3">
                        <option selected>Select ZIP Code</option>
                        <option onClick = {() => this.onZipClicked("63101")}>63101</option>
                        <option value="2">63102</option>
                        <option value="3">63103</option>
                        <option value="4">63104</option>
                        <option value="5">63106</option>
                        <option value="6">63107</option>
                        <option value="7">63108</option>
                        <option value="8">63109</option>
                        <option value="9">63110</option>
                        <option value="10">63111</option>
                        <option value="11">63112</option>
                        <option value="12">63113</option>
                        <option value="13">63115</option>
                        <option value="14">63116</option>
                        <option value="15">63117</option>
                        <option value="16">63118</option>
                        <option value="17">63120</option>
                        <option value="18">63137</option>
                        <option value="19">63139</option>
                        <option value="20">63147</option>
                    </select>
                </div>
                or
                <div className="col col-5">
                    <select name="plastic" onChange={this.fieldChangeHandler} className="custom-select custom-select-lg mb-3">
                        <option selected>Select Recyclable</option>
                        <option value="1">#1 Plastic</option>
                        <option value="2">#2 Plastic</option>
                        <option value="3">#3 Plastic</option>
                        <option value="4">#4 Plastic</option>
                        <option value="5">#5 Plastic</option>
                        <option value="6">#6 Plastic - Expanded/Styrofoam</option>
                        <option value="7">#6 Plastic Bags</option>
                        <option value="8">#6 Plastic Peanuts/Foam Peanuts</option>
                        <option value="9">#6 Rigid Plastics</option>
                        <option value="10">#7 Plastic</option>
                        <option value="11">Bubble Wrap</option>
                        <option value="12">Film</option>
                        <option value="13">Garden Tools</option>
                        <option value="14">Garden Trays</option>
                        <option value="15">Motor Oil Containers</option>
                        <option value="16">Plastic Bags</option>
                        <option value="17">Plastic Buckets</option>
                        <option value="18">Plastic Cards</option>
                        <option value="19">Plastic Furniture</option>
                        <option value="20">Plastic Hanging Baskets</option>
                        <option value="21">Plastic Packing Material</option>
                        <option value="22">Plastic Paint Cans</option>
                        <option value="23">Plastic Plant Cell Packs</option>
                        <option value="24">Plastic Plant Materials</option>
                        <option value="25">Plastic Plant Pots</option>
                        <option value="26">Plastic Plant Trays</option>
                        <option value="27">Plastic Playsets</option>
                        <option value="28">Rigid Plastics</option>
                        <option value="29">Six-Pack Rings</option>
                        <option value="30">Trays</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Search;
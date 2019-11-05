import React, { Component } from 'react';
import one from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/one.jpg';
import two from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/two.jpg';
import three from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/three.jpg';
import four from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/four.jpg';
import five from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/five.jpg';
import seven from 'C:/Users/wkoni/Documents/CapstoneProject/src/images/seven.jpg';


class Bin extends Component {
    render() {
        return (
            <div className="bottles">
                <div align="center">
                <br></br>
                <h1>Home Recycling Bin Items</h1>                
                <br></br>                    
                    <div class="how-right">                        
                            <img src={one} style={{width: "5", height: "5"}}/> <span><h3>Polyethylene Terephalate - Common forms are peanut butter, jelly, and pickle jars, and detergent, mouthwash, salad dressing, vitamin, cooking oil, soda, and water bottles.</h3></span>                        
                        </div>
                        <div class="how-right">                        
                            <img src={two} style={{width: "5", height: "5"}}/> <span><h3>High-Density Polyethylene - Common forms are milk jugs, dairy tubs, juice bottles, cereal box liners, and cleaning agent, motor oil, laundry detergent, and shampoo bottles.</h3></span>                        
                        </div>
                        <div class="how-right">                        
                            <img src={three} style={{width: "5", height: "5"}}/> <span><h3>Polyvinyl Chloride - Common forms are clear food wrapping and packaging, fruit packing, and candy trays.</h3></span>                        
                        </div>
                        <div class="how-right">                        
                            <img src={four} style={{width: "5", height: "5"}}/> <span><h3>Low-Density Polyethylene - Common forms are squeezable bottles, dispensing bottles, and dry cleaning, newspaper, and frozen food bags.</h3></span>                        
                        </div>
                        <div class="how-right">                        
                            <img src={five} style={{width: "5", height: "5"}}/> <span><h3>Polypropylene - Common forms are medicine bottles, sauce bottles, deli and yogurt containers, bottle caps, rigid/reusable cups, and nursery plant pots.</h3></span>                       
                        </div>
                        <div class="how-right">                        
                            <img src={seven} style={{width: "5", height: "5"}}/> <span><h3>Other Plastics - Includes acrylics, polycarbonates, polyactic fibers, nylons, and fiberglass.</h3></span>                        
                        </div>                    
                </div>
            </div>
        );
    }
}

export default Bin;
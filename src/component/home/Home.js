import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import Search from './dashboard/search/Search';

class Home extends Component {

    state = {
        user: {},
        dropOffs: [],
        zipCode: "",
        plastic: "",
        filteredString: "all",
        value: "Select ZIP Code",
        filteredDropOffs: undefined,
        selectedDropOff: undefined,
        searchResults: undefined
    }

    fieldChangeHandler(e) {

    }

    componentDidMount() {

        this.retrieveAllDropOffs();
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        this.setState(
            {
                user: loggedInUser
            }
        )
    }

    setSelectedDropOffInfo(dropOffData) {
        console.log("Selected Drop off ::> ", dropOffData)
        this.setState({ selectedDropOff: dropOffData })
    }

    retrieveAllDropOffs() {
        axios.get("http://localhost:8080/metadata/findDropOffs", {})
            .then(response => {
                if (response.data != undefined) {
                    this.setState({ dropOffs: response.data });
                    localStorage.setItem("dropOffs", JSON.stringify(response.data));
                }
            }).catch(error => {
            });
    }
    
    getDropOffsByZip(event) {
        const value = event.target.value;
        const mapDropOffs = this.state.dropOffs;
        let filteredDropOffs = null;
        let filteredZip = value ? value : "All";
        if (value === null || value === "" || value === "all") {
            filteredDropOffs = mapDropOffs;
        }
        else {
            filteredDropOffs = mapDropOffs.filter(a => {
                return a != null && a.zipCode.includes(value.toUpperCase());
            });

        }
        const markers = filteredDropOffs.map((v, i) => {
            if(v != null){
                return <Marker
                    key={i}
                    position={{ lat: v.latitude, lng: v.longitude }}
                    onClick={() => this.setSelectedDropOffInfo(v)}
                />
            }
        });
        this.setState({
            filteredDropOffs: markers,
            filteredZip: filteredZip
        })
    }

    getDropOffsByPlastic(event) {
        const value = event.target.value;
        const mapDropOffs = this.state.dropOffs;
        let filteredDropOffs = null;
        let filteredPlastic = value ? value : "All";
        if (value === null || value === "" || value === "all") {
            filteredDropOffs = mapDropOffs;
        }
        else {
            axios.get(`http://localhost:8080/metadata/findDropOffsByPlastic?id=${value}`, {})
                .then(response => {
                    if (response.data != undefined) {
                        const markers = response.data.map((v, i) => {
                            if(v != null){
                                return <Marker
                                    key={i}
                                    position={{ lat: v.latitude, lng: v.longitude }}
                                    onClick={() => this.setSelectedDropOffInfo(v)}
                                />
                            }
                        });
                        this.setState({
                            filteredDropOffs: markers
                        })
                        console.log(this.state);
                        localStorage.setItem("dropOffs", JSON.stringify(response.data));
                    }
                }).catch(error => {
                });
        }
    }

    handleSubmit = (event) => {
        console.log(this.state.value);
        alert('Your favorite ZIP code is: ' + this.state.value);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    resetMarkers = (e) => {
        console.log("clearing states");
        e.preventDefault();
        
        this.setState({
            filteredDropOffs: undefined,
            selectedDropOff: undefined
        })
        console.log(this.state);
    }    
    displayAllDropOffs(){
        const markers = this.state.dropOffs.map((v, i) => {
            if(v != null){
                return <Marker
                    key={i}
                    position={{ lat: v.latitude, lng: v.longitude }}
                    onClick={() => this.setSelectedDropOffInfo(v)}
                />
            }
        });
        this.setState({
            filteredDropOffs: markers
        })
    } 
    render() {
        const displaySelectedDropOff = !this.state.selectedDropOff ? "" : (
            <div className="drop-off-desc">
                <strong>{this.state.selectedDropOff.title}</strong> - 
                {` ${this.state.selectedDropOff.streetAddress}, ${this.state.selectedDropOff.zipCode}, ${this.state.selectedDropOff.hours}`}
            </div>
        )
        const markers = this.state.filteredDropOffs;
        // const map = this.state.searchResults == undefined? "Render results after search" : <Map google={this.props.google}
        //                 zoom={12} style={mapStyles} initialCenter={{ lat: 38.626, lng: -90.199}}>
        //                 {this.state.mapDropOffs} 
        //             </Map> 
        return (
            <div className="container-fluid home-margin-top-less-200px">
                <div className="row">
                    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <div align="center">
                                    {/* <li className="nav-item">
                                        <br></br><br></br>
                                        <Link className="nav-link active" to="/home/dashboard" src="../../images/user.svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <h5>Profile</h5><span className="sr-only">(current)</span>
                                        </Link>
                                    </li> */}
                                    <br></br><br></br>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/home/map" onClick={this.displayAllDropOffs.bind(this)} src="../../images/map.svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                                            <h5>Dropoff Map</h5><span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <br></br><br></br>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/list"  src="../../images/list.svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
                                            <h5>Dropoff List</h5><span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <br></br><br></br>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/bin" src="../../images/recycling.svg">
                                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 1089.000000 1280.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                <path d="M6130 12797 c-3 -3 -122 -10 -265 -16 -628 -28 -1204 -87 -1705 -176 -963 -171 -1664 -440 -1991 -765 -96 -94 -147 -168 -187 -268 l-27 -67 0 -430 c0 -423 0 -431 23 -504 178 -566 1441 -1031 3222 -1186 764 -66 1662 -66 2430 1 1524 131 2680 491 3091 961 80 92 115 157 141 268 24 97 25 110 23 475 l-2 375 -27 80 c-39 114 -87 187 -190 291 -561 560 -2171 929 -4201 961 -181 3 -332 3 -335 0z m770 -877 c1421 -54 2596 -286 3279 -646 142 -75 283 -172 279 -193 -5 -27 -155 -126 -308 -205 -662 -340 -1787 -565 -3120 -626 -289 -13 -941 -13 -1230 0 -1333 61 -2458 286 -3120 626 -153 79 -303 178 -308 205 -4 21 137 118 279 193 848 448 2569 710 4249 646z" />
                                                <path d="M6395 8595 c-338 -32 -657 -111 -882 -216 -133 -63 -326 -284 -566 -649 -126 -193 -270 -430 -338 -558 -42 -79 -43 -83 -25 -95 11 -7 196 -108 410 -225 409 -223 697 -372 718 -372 7 0 45 58 83 127 182 330 443 740 579 909 70 88 206 220 249 243 32 17 35 14 128 -124 60 -88 259 -477 259 -506 0 -8 -69 -56 -157 -110 -87 -53 -158 -100 -158 -105 1 -5 25 -12 55 -16 189 -23 1217 -128 1259 -128 22 0 31 6 36 23 4 12 108 277 233 589 124 312 223 571 219 574 -3 3 -78 -30 -166 -75 -88 -45 -163 -81 -168 -81 -4 0 -26 35 -48 77 -104 199 -243 368 -404 489 -153 115 -317 186 -506 220 -125 22 -619 28 -810 9z" />
                                                <path d="M8330 6937 c-221 -152 -881 -626 -908 -651 -10 -10 25 -69 180 -302 362 -541 543 -879 574 -1071 l6 -42 -42 -11 c-125 -34 -197 -41 -440 -47 -210 -5 -257 -3 -267 8 -6 8 -17 95 -23 197 -7 100 -17 182 -22 182 -5 0 -32 -37 -60 -82 -89 -141 -381 -576 -490 -729 -115 -162 -177 -274 -185 -337 -11 -80 10 -109 354 -484 170 -185 203 -213 257 -213 38 0 47 -6 161 -122 67 -68 124 -121 127 -118 3 3 4 83 1 178 -2 95 -1 177 4 183 5 7 65 17 143 23 74 6 167 18 205 26 286 61 543 211 709 413 158 194 392 684 496 1038 71 242 120 564 107 694 -14 126 -127 385 -297 676 -100 172 -436 684 -448 684 -4 0 -68 -42 -142 -93z" />
                                                <path d="M4855 6685 c-38 -8 -315 -57 -615 -111 -300 -53 -547 -98 -549 -101 -9 -7 24 -30 164 -119 77 -48 142 -89 144 -90 2 -2 -13 -30 -33 -63 -51 -83 -120 -231 -150 -323 -42 -125 -58 -215 -63 -363 -6 -164 11 -288 56 -417 16 -46 44 -126 62 -178 92 -270 144 -374 302 -605 43 -63 176 -214 270 -307 177 -176 306 -270 452 -332 113 -47 260 -71 588 -97 145 -11 833 -6 970 7 l59 6 -7 136 c-7 147 -14 260 -45 752 -11 173 -23 339 -26 368 l-6 53 -91 -8 c-51 -4 -299 -8 -552 -8 -382 0 -484 3 -602 18 -217 27 -353 67 -353 105 0 43 96 249 180 387 32 53 153 235 176 264 2 2 78 -36 170 -83 92 -48 171 -85 176 -84 6 2 -520 1097 -571 1188 -11 20 -24 21 -106 5z" /><path d="M6021 2890 c-1122 -42 -2080 -255 -2547 -565 -99 -67 -208 -180 -241 -252 -24 -52 -25 -58 -21 -261 4 -203 5 -208 32 -265 167 -348 959 -638 2076 -761 386 -43 554 -51 1100 -50 544 0 709 7 1090 50 1042 115 1800 374 2036 695 59 80 65 112 71 335 l5 202 -29 58 c-157 325 -905 615 -1913 743 -498 64 -1133 91 -1659 71z" /></g></svg>
                                            <h5>What Can Go in My Recycling Bin?</h5><span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </nav>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4"><div className="chartjs-size-monitor" style={{ position: 'absolute', left: '0px', top: '0px', right: '0px', bottom: '0px', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div style={{ position: 'absolute', width: '1000000px', height: '1000000px', left: '0', top: '0' }}></div></div><div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: '0', top: '0', right: '0', bottom: '0', overflow: 'hidden', 'pointer-events': 'none', visibility: 'hidden', 'zIndex': '-1' }}><div style={{ position: 'absolute', width: '200%', height: '200%', left: '0', top: '0' }}></div></div></div>                       
                        <div className="row top-margin">
                            <div className="col col-3">
                                <form onSubmit={this.getDropOffsByZip}>
                                    <select name="zipCode" value={this.state.value} onChange={this.getDropOffsByZip.bind(this)} className="custom-select custom-select-lg mb-3">
                                        <option selected="">Select ZIP Code</option>
                                        <option value="63101">63101</option>
                                        <option value="63102">63102</option>
                                        <option value="63103">63103</option>
                                        <option value="63104">63104</option>
                                        <option value="63106">63106</option>
                                        <option value="63107">63107</option>
                                        <option value="63108">63108</option>
                                        <option value="63109">63109</option>
                                        <option value="63110">63110</option>
                                        <option value="63111">63111</option>
                                        <option value="63112">63112</option>
                                        <option value="63113">63113</option>
                                        <option value="63115">63115</option>
                                        <option value="63116">63116</option>
                                        <option value="63117">63117</option>
                                        <option value="63118">63118</option>
                                        <option value="63120">63120</option>
                                        <option value="63137">63137</option>
                                        <option value="63139">63139</option>
                                        <option value="63147">63147</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col col-1 center or"><h4>or</h4></div>
                            <div className="col col-4">
                                <form onSubmit={this.getDropOffsByPlastic}>
                                    <select name="plastic" value={this.state.value} onChange={this.getDropOffsByPlastic.bind(this)} className="custom-select custom-select-lg mb-3">
                                        <option selected="">Select Recyclable</option>
                                        <option value="100">#1 Plastic</option>
                                        <option value="101">#2 Plastic</option>
                                        <option value="102">#3 Plastic</option>
                                        <option value="103">#4 Plastic</option>
                                        <option value="104">#5 Plastic</option>
                                        <option value="105">#6 Plastic - Expanded/Styrofoam</option>
                                        <option value="106">#6 Plastic Bags</option>
                                        <option value="107">#6 Plastic Peanuts/Foam Peanuts</option>
                                        <option value="108">#6 Rigid Plastics</option>
                                        <option value="109">#7 Plastic</option>
                                        <option value="110">Bubble Wrap</option>
                                        <option value="111">Film</option>
                                        <option value="112">Garden Tools</option>
                                        <option value="113">Garden Trays</option>
                                        <option value="114">Motor Oil Containers</option>
                                        <option value="115">Plastic Bags</option>
                                        <option value="116">Plastic Buckets</option>
                                        <option value="117">Plastic Cards</option>
                                        <option value="118">Plastic Furniture</option>
                                        <option value="119">Plastic Hanging Baskets</option>
                                        <option value="120">Plastic Packing Material</option>
                                        <option value="121">Plastic Paint Cans</option>
                                        <option value="122">Plastic Plant Cell Packs</option>
                                        <option value="123">Plastic Plant Materials</option>
                                        <option value="124">Plastic Plant Pots</option>
                                        <option value="125">Plastic Plant Trays</option>
                                        <option value="126">Plastic Playsets</option>
                                        <option value="127">Rigid Plastics</option>
                                        <option value="128">Six-Pack Rings</option>
                                        <option value="129">Trays</option>
                                    </select>
                                </form>
                            </div>
                            {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"> */}
                            <div className="col col-4">
                                <button className="btn btn-outline-success btn-lg" onClick={this.resetMarkers}>Clear</button>
                            </div>
                        </div>
                        <div className="row">
                            {displaySelectedDropOff}
                        </div>                        
                        <br></br>
                        <Route path='/home/dashboard' component={Dashboard} />
                        <Route exact path='/home' component={() => <Search searchForDropOffs={this.searchForDropOffs} />} />
                        <Map google={this.props.google}
                            zoom={12} style={mapStyles} initialCenter={{ lat: 38.637642, lng: -90.200379 }}>
                            {markers}
                        </Map>
                    </main>
                </div>
            </div>
        )
    }
}
const mapStyles = {
    width: '97%',
    height: '140%',
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyByQDkqLYFQrfHRG4UfpKIQhTiV6ZDrfdc'})(Home);
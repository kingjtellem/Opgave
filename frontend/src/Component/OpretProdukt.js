import React, {Component} from 'react';
import axios from 'axios';

export default class OpretProdukt extends Component {

    constructor(props) {
        super(props);

        this.onChangeProduktNavn = this.onChangeProduktNavn.bind(this);
        this.onChangeProduktBeskrivelse = this.onChangeProduktBeskrivelse.bind(this);
        this.onChangeProduktPris = this.onChangeProduktPris.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 

        this.state = {
            ProduktNavn: '',
            ProduktBeskrivelse: '',
            Pris: '',
            ProduktFoto: ''
        }
    }

    onChangeProduktNavn(e) {
        this.setState({
            ProduktNavn: e.target.value
        });
    }

    onChangeProduktBeskrivelse(e) {
        this.setState({
            ProduktBeskrivelse: e.target.value
        });
    }

    onChangeProduktPris(e) {
        this.setState({
            ProduktPris: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Produkt Navn: ${this.state.ProduktNavn}`);
        console.log(`Produkt Beskrivelse: ${this.state.ProduktBeskrivelse}`);
        console.log(`Produkt Pris: ${this.state.ProduktPris}`);
        console.log(`Produkt Foto: ${this.state.ProduktFoto}`);

        const newProdukt = {
            ProduktetNavn: this.state.ProduktNavn,
            ProduktBeskrivelse: this.state.ProduktBeskrivelse,
            ProduktPris: this.state.ProduktPris,
            ProduktFoto: this.state.ProduktFoto
        }

        axios.post('http://localhost:4010/produkt/add', newProdukt)
            .then(res => console.log(res.data));

        this.setState({
            ProduktetNavn: '',
            ProduktBeskrivelse: '',
            ProduktPris: '',
            ProduktFoto: false
        })
    }

    state = {
        selectedFile: null
      }
    
      checkType = (t) => {
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        return types.every(type => t !== type);
    }
    
    //Checker fil typen.
    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files;
        //define message container
        let err = '';
    
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't match
            if (this.checkType(files[x].type)) {
                err += files[x].type + ' is not a supported format\n'; // create error message and assign to container 
            }
        };
    
        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err);
            alert(err);
            return false;
        }
        return true;
    }
       //Checker fil størrelsen. 
       checkFileSize=(event)=>{
        let files = event.target.files
        let size = 15000 
        let err = ""; 
        for(var x = 0; x<files.length; x++) {
        if (files[x].size > size) {
         err += files[x].type+'is too large, please pick a smaller file\n';
       }
     };
     if (err !== '') {
        event.target.value = null
        console.log(err);
        return false
    }
    
    return true;
    
    }
      onChangeHandler = event => {
        //Det her er lavet om når man skal multi upload.
        var files = event.target.files
        if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkMimeType(event)){ 
        console.log(event.target.files)
        this.setState({
          selectedFile: files
        });
      }
      }
      onClickHandler = () => {
    
        //Send fil afsted som ligger gemt i state.
        const data = new FormData();
        //Det her er lavet om når man skal multi upload.
        for(var x = 0; x<this.state.selectedFile.length; x++) {
          data.append('file', this.state.selectedFile[x])
      }
    
        axios.post('http://localhost:4010/upload-img', data, {
    
        })
        
        .then (res => {
        //Gik det godt? Hvad siger response.
        console.log(res.statusText);
        alert("Serveren svarer: " + res.statusText);
      });
      }
        //Kan uploade max 3 filere.
      maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length > 1) { 
               const msg = 'Only 1 images can be uploaded at a time'
               event.target.value = null // discard selected file
               console.log(msg)
              return false;
     
          }
        return true;
     
     }

    render() {
        return (
        <div style={{marginTop: 20}}>
        <h3>Skab Et Nyt Produkt</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Navn: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.ProduktNavn}
                        onChange={this.onChangeProduktNavn}
                        />
            </div>
            <div className="form-group">
                <label>Beskrivelse: </label>
                <input  type="text"
                        className="form-control"
                        value={this.state.ProduktBeskrivelse}
                        onChange={this.onChangeProduktBeskrivelse}
                        />
            </div>
            <div className="form-group">
                <label>Pris: </label>
                <input  type="number"
                        className="form-control"
                        value={this.state.ProduktPris}
                        onChange={this.onChangeProduktPris}
                        />
            </div>
            <div className="form-group">
            <label>Upload Billede.</label>
            
      {/* Det her er lavet om når man skal multi upload. */}
        <input type="file" multiple onChange={this.onChangeHandler} name="file" id="file" />>
          <br/>
          <button onClick={this.onClickHandler} className="btn btn-primary" >Skab Produkt</button>
            
            </div>
        </form>
    </div>
        )
    }
}
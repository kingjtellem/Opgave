import React, {Component} from 'react';
import axios from 'axios';

export default class RetProdukt extends Component {
    constructor(props) {
        super(props);

        this.onChangeProduktNavn = this.onChangeProduktNavn.bind(this);
        this.onChangeProduktBeskrivelse = this.onChangeProduktBeskrivelse.bind(this);
        this.onChangeProduktPris = this.onChangeProduktPris.bind(this);
        this.onChangeProduktFoto = this.onChangeProduktFoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ProduktNavn: '',
            ProduktBeskrivelse: '',
            Pris: '',
            ProduktFoto: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4010/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    ProduktNavn: response.data.ProduktNavn,
                    ProduktBeskrivelse: response.data.ProduktBeskrivelse,
                    Pris: response.data.Pris,
                    ProduktFoto: response.data.ProduktFoto
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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

    onChangePris(e) {
        this.setState({
            Pris: e.target.value
        });
    }

    onChangeProduktFoto(e) {
        this.setState({
            ProduktFoto: !this.state.ProduktFoto
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            ProduktNavn: this.state.ProduktNavn,
            ProduktBeskrivelse: this.state.ProduktBeskrivelse,
            Pris: this.state.Pris,
            ProduktFoto: this.state.ProduktFoto
        };
        axios.post('http://localhost:4010/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }
    render() {
        return (
        <div>
        <h3>Update Produkt</h3>
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
                <div className="form-check">
                    <input  type="checkbox"
                            className="form-check-input"
                            id="completedCheckbox"
                            name="completedCheckbox"
                            onChange={this.onChangeProduktFoto}
                            checked={this.state.ProduktFoto}
                            value={this.state.ProduktFoto}
                            />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
        </form>
    </div>
        )
    }
}
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Produkt = props => (
    <tr>
        <td className={props.produkt.ProduktFoto ? 'completed' : ''}>{props.produkt.ProduktNavn}</td>
        <td className={props.produkt.ProduktFoto ? 'completed' : ''}>{props.produkt.ProduktBeskrivelse}</td>
        <td className={props.produkt.ProduktFoto ? 'completed' : ''}>{props.produkt.Pris}</td>
        <td>
            <Link to={"/edit/"+props.produkt._id}>Edit</Link>
        </td>
    </tr>
)

export default class ProduktList extends Component {

    constructor(props) {
        super(props);
        this.state = {produkter: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4010/produkter/')
            .then(response => {
                this.setState({produkter: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4010/produkter/')
        .then(response => {
            this.setState({produkter: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    produktList() {
        return this.state.produkter.map(function(currentProdukt, i) {
            return <Produkt produkt={currentProdukt} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Produkt Liste</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Beskrivelse</th>
                            <th>Pris</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.produktList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
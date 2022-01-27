import { withRouter  } from "next/router";
import React, { Component  } from 'react'
import {checkTail, getTail} from "../service/apolloclient";

class MyDynamicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tail: '',
            id: '',
            title: '',
            description: '',
            error: false,
        }
    }

    async componentDidMount() {
        setTimeout(async() => {
            const {tail} = this.props.router.query;
            const [data] = await getTail(this.props.router.query.tail);
            if (!data) {
                this.setState({
                    error: true,
                })
                return;
            }
            const detail = await checkTail(data.json_id);
            this.setState({
                tail: tail,
                id: data.json_id,
                title: detail.title,
                description: detail.description,
            });
        }, 1000);
    }

    render() {
        return (
            <div style={{margin: '20px 40px'}}>
                {this.state.error ?
                    (
                        <h3>Data not found</h3>
                    )
                    :(
                        <div>
                            <h3> title: {this.state.title}</h3>
                            <h3> description: {this.state.tail}</h3>
                        </div>

                    )
                }

            </div>
        )
    }
}

export default withRouter(MyDynamicPage);
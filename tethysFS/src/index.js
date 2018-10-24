import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.masterOrders ?
            product.name :
            <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }

            if (inStockOnly && !product.stocked) {
                return;
            }

            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <form>

                <div id="searchInputControls" class="DottedBox">
                    <label class="control-label">
                        Env:
                </label> <select id="lstEnvName" class="sol-inner-container" styles="padding: 0px 0px 0px 2px;"></select>
                    <label class="control-label">
                        Age:
                </label>
                    <select id="lstOrderAge" class="sol-inner-container" styles="padding: 0px 0px 0px 2px;width: 85px;">
                        <option value="-1">--Day--</option>
                        <option value="0" selected="selected">Today</option>
                        <option value="1">One Day</option>
                        <option value="2">Two Day</option>
                        <option value="3">Three Day</option>
                        <option value="4">Four Day</option>
                    </select>
                    <label class="control-label">Order Id:</label> <input type="text" name="txtClOrdId" maxlength="50" class="sol-inner-container" styles="width:150px; padding: 0px 10px 0px 2px;" id="txtClOrdId" />
                    <label class="control-label">Symbol:</label> 
                    <input
                        type="text"
                        class="SearchTextStyle"
                        placeholder="Search..."
                        value={this.props.filterText}
                        onChange={this.handleFilterTextChange}
                    />
                    
                    <label class="control-label">Firm:</label> <select id="lstFirmName" class="searchBySymbol sol-inner-container" styles="padding: 0px 0px 0px 2px;width: 100px;"></select>
                    <p>
                        <input
                            type="checkbox"
                            checked={this.props.inStockOnly}
                            onChange={this.handleInStockChange}
                        />
                        {' '}
                        Only show master orders
                    </p>
                </div>

            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>

        );
    }
}


const PRODUCTS = [
    { category: 'Stocks', price: '$49.99', masterOrders: true, name: 'AAPL' },
    { category: 'Stocks', price: '$9.99', masterOrders: true, name: 'ABC' },
    { category: 'Stocks', price: '$29.99', masterOrders: false, name: 'IBM' },
    { category: 'Stocks', price: '$99.99', masterOrders: false, name: 'Google' },
    { category: 'Future', price: '$399.99', masterOrders: true, name: 'FB' },
    { category: 'Future', price: '$199.99', masterOrders: true, name: 'Microsoft' }
];

class Button1 extends React.Component {
    handleChange = () => {
        this.props.onClickFunction(this.props.increamentValue);
    };

    render() {
        return (
            <button onClick={this.handleChange}>+{this.props.increamentValue}</button>
        );
    }
}

const Result = (props) => {
    return (
        <div>{props.counter}</div>
    );
};

class Apps extends React.Component {
    state = { counter: 0 };

    increamentCounter = (increamentValue) => {
        this.setState((prevState) => ({
            counter: prevState.counter + increamentValue
        }));
    };

    render() {
        return (
            <div>
                <Button1 increamentValue={1} onClickFunction={this.increamentCounter} />
                <Button1 increamentValue={5} onClickFunction={this.increamentCounter} />
                <Button1 increamentValue={10} onClickFunction={this.increamentCounter} />
                <Button1 increamentValue={100} onClickFunction={this.increamentCounter} />
                <Result counter={this.state.counter} />
            </div>
        );
    }
}

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);

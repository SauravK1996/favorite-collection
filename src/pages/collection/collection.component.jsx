import React from 'react';
import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import {connect} from 'react-redux';
import {selectCollection} from '../../redux/shop/shop.selector';

//category wise items
const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    //console.log(collection);
    return(
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map(item => (<CollectionItem key={item.id} item={item} />))
                }
            </div>
        </div>
    );
};

//ownProps is the props of the component that we are wrapping in the connect that gives all the props that the component receives including the match object that we are getting from the route component
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state) // state: because unlike other selectors, this selector needs a part of the state  depending on the URL parameter
});

export default connect(mapStateToProps)(CollectionPage);
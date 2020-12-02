import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import CollectionsOverview from '../../components/collection-overviews/collection-overviews.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    // constructor(){
    //     super();
    //     state = { 
    //         loading: true
    //     };
    // }

    state = { 
        loading: true
    };

    unsubscribeFromSanpshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
         
        // fetch(
        //     'https://firestore.googleapis.com/v1/projects/favoritecollectiondb/databases/(default)/documents/collections'
        // )
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));


        // collectionRef.get().then( snapshot => {
        //    const collectionMap = convertCollectionsSnapshotToMap(snapshot);
        //    updateCollections(collectionMap);
        //    this.setState({loading : false});
        // });

        this.unsubscribeFromSanpshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap =  convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap);
            this.setState({loading : false});
        });
    }

    render(){
        const {match} = this.props;
        const {loading} = this.state;
        
        return(
            <div className='shop-page'>
                {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}

                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={(props) => (<CollectionsOverviewWithSpinner isLoading={loading} {...props} />)} 
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props) => (<CollectionPageWithSpinner isLoading={loading} {...props} />)}    
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
















// import React from 'react';
// import {Route} from 'react-router-dom';
// import CollectionsOverview from '../../components/collection-overviews/collection-overviews.component';
// import CollectionPage from '../collection/collection.component';

// const ShopPage = ({match}) => (
//     <div className="shop-page">
//         <Route exact path={`${match.path}`} component={CollectionsOverview}/>
//         <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
// );


// export default ShopPage;
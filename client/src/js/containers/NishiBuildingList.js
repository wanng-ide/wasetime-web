import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchBuildings } from '../actions/index';
import { getIsFetching, getBuildings, getError } from '../reducers/buildings';
import BuildingList from '../components/BuildingList';
import LoadingSpinner from '../components/LoadingSpinner';
import FetchError from '../components/FetchError';
import nishiBuildings from '../data/buildingList';
import background from '../../img/nishi_waseda_campus.jpg';

class NishiBuildingList extends React.Component {
  constructor(props) {
    super(props);
    this.name = 'Nishi-Waseda Campus';
    this.background = background;
  }

  componentDidMount() {
    this.props.fetchBuildings();
  }

  render() {
    const { isFetching, buildings, error, fetchBuildings } = this.props;
    if (isFetching && !buildings.length) {
      return <LoadingSpinner />;
    }

    if (error && !buildings.length) {
      return <FetchError onRetry={fetchBuildings} />;
    }
    return (
      <BuildingList
        name={this.name}
        buildings={buildings}
        background={this.background}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: getIsFetching(state.buildings),
    buildings: getBuildings(state.buildings, nishiBuildings),
    error: getError(state.buildings)
  };
};

const mapDispatchToProps = {
  fetchBuildings
};

export default connect(mapStateToProps, mapDispatchToProps)(NishiBuildingList);

NishiBuildingList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  buildings: PropTypes.array.isRequired,
  error: PropTypes.object,
  fetchBuildings: PropTypes.func.isRequired
};

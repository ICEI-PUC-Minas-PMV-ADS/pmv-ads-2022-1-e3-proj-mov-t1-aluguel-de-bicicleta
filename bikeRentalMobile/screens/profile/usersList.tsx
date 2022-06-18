import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { SELECTED_USER_REDUCER_OPTIONS } from "../reducers/selectedUserReducer";

import PageHeader from "../common/pageHeader";
import { CardHeading, CardLink, CardSpan, ListCard } from "../common/listCard";
import { FilterInput } from "../common/styled";
import {
  fetchUsers,
  setShowUsersWithReservations,
} from "../actions/userActions";
import { getLoggedInUser, ROUTES } from "../common/utils";
import { SEARCH_FILTERS_REDUCER_OPTIONS } from "../reducers/searchFiltersReducer";
import UserReservationList from "./userReservationList";

function UsersList(): JSX.Element {
  const usersData = useSelector(
    (state: { users: IStorageResult[] }) => state.users
  );
  const { showUserWithReservation } = useSelector(
    (state: { searchFilters: ISearchFilters }) => state.searchFilters
  );
  const [filter, setFilter] = useState("");
  const [filteredList, setFilteredList] = useState(usersData);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
      payload: null,
    });

    dispatch(fetchUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = usersData?.reduce(
      (acc: IStorageResult[], user: IStorageResult) => {
        const { email, firstName, lastName } = user;
        const valuesArray = [email, firstName, lastName];
        const matchingValues = valuesArray.filter((value) =>
          value?.toString().toLowerCase().includes(filter.toLowerCase())
        );
        if (matchingValues.length) acc.push(user);

        return acc;
      },
      []
    );

    setFilteredList(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, usersData]);

  const placeLink =
    history.location.pathname === "/" ? "" : history.location.pathname;

  useEffect(() => {
    const { SHOW_USERS_WITH_RESERVATIONS } = SEARCH_FILTERS_REDUCER_OPTIONS;

    const sessionValue = window.sessionStorage.getItem(
      SHOW_USERS_WITH_RESERVATIONS
    );
    if (!!sessionValue !== showUserWithReservation) {
      dispatch(setShowUsersWithReservations(!sessionValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUserWithReservation]);

  const handleShowUsersWithReservations = (): void => {
    dispatch(setShowUsersWithReservations(!showUserWithReservation));
  };

  const { isManager } = getLoggedInUser().result;
  return (
    <StyledUsersList className="usersList">
      <PageHeader pageName="Users" />
      {isManager ? (
        <Link to={ROUTES.NEW_USER} className="usersList--AddBikeBtn">
          <i className="fas fa-plus" />
        </Link>
      ) : null}
      <FilterInput
        className="usersList--searchInput"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <button
        type="button"
        onClick={handleShowUsersWithReservations}
        className="usersList--filterBtn"
      >
        {showUserWithReservation
          ? "Show all users"
          : "Show users with reservations"}
      </button>
      {filteredList.map((user: IStorageResult) => {
        const isManagersOwnProfile = user._id === getLoggedInUser().result._id;
        const userDoesntHaveReservations = !user.reservations.length;
        if (
          isManagersOwnProfile ||
          (showUserWithReservation && userDoesntHaveReservations)
        )
          return null;
        return (
          <ListCard className="usersList--card" key={user._id}>
            <CardLink
              className="usersList--card__link"
              to={`${placeLink}/${user._id}`}
              onClick={() =>
                dispatch({
                  type: SELECTED_USER_REDUCER_OPTIONS.SET_SELECTED_USER,
                  payload: user,
                })
              }
            >
              <CardHeading className="usersList--card__link--model">{`${user.firstName} ${user.lastName}`}</CardHeading>
              <CardSpan className="usersList--card__link--color">
                {user.email}
              </CardSpan>
            </CardLink>
            {showUserWithReservation ? (
              <UserReservationList reservations={user.reservations} />
            ) : null}
          </ListCard>
        );
      })}
    </StyledUsersList>
  );
}

export default UsersList;

const StyledUsersList = styled.div`
  padding: var(--padding);
  flex-grow: 1;
  width: 100%;
  list-style: none;
  margin: 0;

  .usersList {
    &--filterBtn {
      padding: 10px 0;
      width: 100%;
      max-width: 500px;
      display: flex;
      justify-content: center;
      border: none;
      background: var(--dark-blue);
      color: white;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 20px;
    }
    &--AddBikeBtn {
      color: var(--yellow);
      font-size: 35px;
      position: absolute;
      right: var(--padding);
      top: var(--padding);
    }
  }
`;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteBike, getBike } from "../actions/bikeActions";
import { getBikesByDates } from "../actions/bikeByDatesActions";
import { createReservation } from "../actions/reservationActions";
import { rateBike } from "../api";
import { CardRating } from "../common/listCard";
import PageHeader from "../common/pageHeader";
import SelectedAssetButtons from "../common/selectedAssetButtons";
import { getLoggedInUser, ROUTES } from "../common/utils";
import { RATING_OPTIONS } from "../reducers/searchFiltersReducer";

function SelectedBike(): JSX.Element {
  const { selectedBike, selectedTimestamps } = useSelector(
    (state: { selectedBike: IBike; selectedTimestamps: ITimestamps }) => state
  );
  const params = useParams() as { bikeId: string };
  const history = useHistory();
  const dispatch = useDispatch();
  const userRating = selectedBike?.userRatingValue;

  useEffect(() => {
    dispatch(getBike(params.bikeId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (): void => {
    dispatch(deleteBike(selectedBike));
    history.push(ROUTES.BIKES);
  };

  const handleBikeBooking = (): void => {
    const reservationParams = {
      bikeId: selectedBike._id,
      startTimestamp: selectedTimestamps.start,
      endTimestamp: selectedTimestamps.end,
    };
    dispatch(createReservation(reservationParams, selectedBike, history));
  };

  const handleRatingClick = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ): void => {
    event.preventDefault();

    rateBike(selectedBike._id, value).then(() => {
      dispatch(getBike(params.bikeId));
      dispatch(getBikesByDates(selectedTimestamps));
    });
  };
  const { isManager } = getLoggedInUser().result;

  return selectedBike ? (
    <StyledSelectedBike className="selectedBike">
      <PageHeader pageName={selectedBike.model} />
      <SelectedAssetButtons onDelete={onDelete} />
      <span className="selectedBike--color">
        <strong>Color: </strong> {selectedBike.color}
      </span>
      <span className="selectedBike--location">
        <strong>Location: </strong> {selectedBike.location}
      </span>
      <span className="selectedBike--rating">
        <h3 className="selectedBike--rating__title">
          {isManager ? "Bike Rating" : "Rate Bike"}:{" "}
        </h3>
        {isManager ? null : (
          <div className="selectedBike--rating__buttons">
            {RATING_OPTIONS.map((ratingValue) => (
              <button
                className={ratingValue <= userRating ? "selectedRating" : ""}
                type="button"
                onClick={(event) => handleRatingClick(event, ratingValue)}
                key={ratingValue}
              >
                <i
                  className={`${
                    ratingValue <= userRating ? "fas" : "far"
                  } fa-star`}
                />
              </button>
            ))}
          </div>
        )}
        <CardRating
          className={`selectedBike--rating__value rating${Math.floor(
            selectedBike.rateAverage
          )}`}
        >
          {selectedBike.rateAverage}
        </CardRating>
      </span>
      {isManager ? null : (
        <button
          type="button"
          disabled={!selectedBike.isAvailable}
          className="selectedBike--bookingBtn"
          onClick={handleBikeBooking}
        >
          {selectedBike.isAvailable ? "Book Bike" : "Bike Unavailable"}
        </button>
      )}
    </StyledSelectedBike>
  ) : (
    <div />
  );
}

export default SelectedBike;

const StyledSelectedBike = styled.div`
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  position: relative;
  .selectedBike {
    &--color,
    &--location,
    &--isAvailable {
      margin-bottom: 40px;

      strong {
        color: var(--dark-blue);
        text-transform: uppercase;
      }
    }
    &--rating {
      position: relative;
      &__buttons {
        button {
          background: transparent;
          font-size: 30px;
          border: none;
          opacity: 0.2;
          &.selectedRating {
            color: var(--yellow);
            opacity: 1;
          }
        }
      }
    }
    &--bookingBtn {
      padding: 10px 0;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 17px;
      background: var(--red);
      color: white;
      margin-top: 80px;
      text-transform: uppercase;
      &:disabled {
        color: black;
        background: var(--gray);
        opacity: 0.6;
      }
    }
  }
`;

import { ComponentReturnType } from "typings/components";
import { Lot, LotId } from "typings/lot";
import { api } from "../api";
import { VDom } from "../createElement";
import { setLotFavorite, setLotUnfavorite } from "../store/actions";
import { store as appStore } from "../store/index";
import { connect } from "../store/createStore";

function FavoriteButton({
  active,
  onFavorite,
  onUnfavorite,
}: {
  active: boolean;
  onFavorite: () => void;
  onUnfavorite: () => void;
}): ComponentReturnType {
  return active
    ? VDom.createElement(
        "button",
        {
          className: "button button--favorite",
          type: "button",
          onClick: onUnfavorite,
        },
        "-"
      )
    : VDom.createElement(
        "button",
        {
          className: "button",
          type: "button",
          onClick: onFavorite,
        },
        "+"
      );
}

interface LotProps {
  readonly lot: Lot;
  readonly key: Lot["id"];
  readonly favorite: (id: LotId) => void;
  readonly unfavorite: (id: LotId) => void;
}

function LotComponent({
  lot,
  favorite,
  unfavorite,
}: LotProps): ComponentReturnType {
  return VDom.createElement(
    "article",
    {
      className: `lot${lot.favorite ? " lot--favorite" : ""}`,
    },
    VDom.createElement(
      "div",
      {
        className: "lot__price",
      },
      lot.price.toString()
    ),
    VDom.createElement(
      "h5",
      {
        className: "lot__name",
      },
      lot.name
    ),
    VDom.createElement(
      "p",
      {
        className: "lot__description",
      },
      lot.description
    ),
    VDom.createElement(FavoriteButton, {
      active: lot.favorite,
      onFavorite: () => favorite(lot.id),
      onUnfavorite: () => unfavorite(lot.id),
    })
  );
}

interface DispatchProps {
  readonly favorite: (id: LotId) => void;
  readonly unfavorite: (id: LotId) => void;
}

interface OwnProps {
  readonly store: typeof appStore;
  readonly lot: Lot;
  readonly key: Lot["id"];
}

const mapDispatchToProps = (dispatch: (typeof appStore)["dispatch"]) => ({
  favorite: (id: LotId) => {
    api.post(`/lots/${id}/favorite`).then(() => {
      dispatch(setLotFavorite({ id }));
    });
  },
  unfavorite: (id: LotId) => {
    api.post(`/lots/${id}/unfavorite`).then(() => {
      dispatch(setLotUnfavorite({ id }));
    });
  },
});

export default connect<typeof appStore, null, DispatchProps, OwnProps>(
  null,
  mapDispatchToProps
)(LotComponent);

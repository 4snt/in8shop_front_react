"use client";

import { Rating } from "@mui/material";
import moment from "moment";
import Avatar from "./Avatar";
import Heading from "./Heading";

interface Review {
  id: string | number;
  rating: number;
  comment: string;
  createdDate: string;
  user: {
    name: string;
    image: string;
  };
}

interface ListRatingProps {
  product: {
    reviews: Review[];
  };
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2 text-[var(--foreground)] flex flex-col gap-4">
        {product.reviews &&
          product.reviews.map((review) => (
            <div key={review.id} className="max-w-[300px]">
              <div className="flex gap-2 items-center">
                <div>
                  <Avatar src={review.user.image} />
                </div>
                <div>
                  <div className="font-semibold">{review.user?.name}</div>
                  <div className="font-light text-xs text-[var(--muted)]">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <Rating
                  value={review.rating}
                  readOnly
                  sx={{
                    color: "var(--foreground)",
                    "& .MuiRating-iconFilled": {
                      color: "gold",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "var(--border)",
                    },
                  }}
                />
              </div>
              <div className="ml-2 mt-1 text-[var(--muted)] italic">
                {review.comment}
              </div>
              <hr className="mt-4 mb-4"></hr>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListRating;

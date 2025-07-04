import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



const userSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    videoOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
)
video.Schema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", userSchema);
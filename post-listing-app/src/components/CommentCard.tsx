



type Props = {
    id: number;
    name: string;
    email: string;
    body: string;
};

const CommentCard = ({ id, name, email, body }: Props) => {

    


    return (
        <div className="border-2 border-solid border-gray-300 rounded-2xl p-3 mb-2">

            <div className="flex justify-between items-center">
                <p className="font-serif text-black text-xl">
                    {id}-{"  "}Name:
                    <span className="text-gray-800 text-lg">
                        {"  "}
                        {name}
                    </span>
                </p>
                
            </div>

            <p className="font-serif text-black text-xl">
                Email:
                <span className="text-gray-800 text-lg">
                    {"  "}
                    {email}
                </span>
            </p>

            <p className="font-serif text-black text-xl">
                Body:
                <span className="text-gray-800 text-lg">
                    {"  "}
                    {body}
                </span>
            </p>

            
        </div>
    );
};

export default CommentCard;
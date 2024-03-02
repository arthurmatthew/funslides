interface IPersonalizedAction {
    children: React.ReactNode;
}

export const PersonalAction = ({ children }: IPersonalizedAction) => {
    return (
        <div className="flex h-80 flex-col items-center justify-center gap-4 rounded-lg border-2 border-gray-300 bg-white">
            {children}
        </div>
    );
};

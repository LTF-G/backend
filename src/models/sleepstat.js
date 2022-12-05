module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Sleepstat",
        {
            sid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                onDelete: "cascade",
                references: {
                    model: "users",
                    key: "id",
                },
            },
            sleep_start: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            sleep_stop: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            toss_turn: {
                type: DataTypes.JSONB,
                allowNull: true,
            },
            actual_sleep: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            tableName: "sleepstats", // 테이블 이름
            timestamps: false,
        }
    );
};

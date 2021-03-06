import { expect, assert } from "chai";
import "mocha";
import { TestDBs, JSON2CSV, CSV2JSON, cleanNsqlJoin } from "./init";
import { comments, users, posts, multiJoinResult } from "./data";
import { nanoSQL, nSQL as nSQLDefault } from "../src";
import { InanoSQLInstance, InanoSQLFKActions, InanoSQLAdapter } from "../src/interfaces";
import { uuid, crowDistance, assign, noop } from "../src/utilities";
import { SyncStorage } from "../src/adapters/syncStorage";
import { randomString } from "./utils";
import * as fs from "fs";
import * as path from "path";

describe("Testing Other Features", () => {

    it("Select Equals", (done: MochaDone) => {
        nSQLDefault([
            { id: 50 }
        ]).query("select").where(["id", "=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Equals", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 50 } } }
        ]).query("select").where(["id.value.prop", "=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Nested Function", (done: MochaDone) => {
        nSQLDefault([
            { name: "bill" }
        ]).query("select", ["UPPER(UPPER(name)) as name"]).exec().then((rows) => {
            try {
                expect(rows).to.deep.equal([{name: "BILL"}]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Not Equals", (done: MochaDone) => {
        nSQLDefault([
            { id: 60 }
        ]).query("select").where(["id", "!=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Not Equals", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 60 } } }
        ]).query("select").where(["id.value.prop", "!=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Greater Than", (done: MochaDone) => {
        nSQLDefault([
            { id: 60 }
        ]).query("select").where(["id", ">", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Greater Than", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 60 } } }
        ]).query("select").where(["id.value.prop", ">", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Greater Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: 60 }
        ]).query("select").where(["id", ">=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Greater Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 60 } } }
        ]).query("select").where(["id.value.prop", ">=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Greater Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: 50 }
        ]).query("select").where(["id", ">=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Greater Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 50 } } }
        ]).query("select").where(["id.value.prop", ">=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Less Than", (done: MochaDone) => {
        nSQLDefault([
            { id: 30 }
        ]).query("select").where(["id", "<", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Less Than", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 30 } } }
        ]).query("select").where(["id.value.prop", "<", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Less Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: 30 }
        ]).query("select").where(["id", "<=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Less Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 30 } } }
        ]).query("select").where(["id.value.prop", "<=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Less Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: 50 }
        ]).query("select").where(["id", "<=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Less Than or Equal To", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 50 } } }
        ]).query("select").where(["id.value.prop", "<=", 50]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select In", (done: MochaDone) => {
        nSQLDefault([
            { id: 20 }
        ]).query("select").where(["id", "IN", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select In", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 20 } } }
        ]).query("select").where(["id.value.prop", "IN", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select Not In", (done: MochaDone) => {
        nSQLDefault([
            { id: 30 }
        ]).query("select").where(["id", "NOT IN", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select Not In", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 30 } } }
        ]).query("select").where(["id.value.prop", "NOT IN", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select LIKE", (done: MochaDone) => {
        nSQLDefault([
            { id: "billy" }
        ]).query("select").where(["id", "LIKE", "bill%"]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select LIKE", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: "billy" } } }
        ]).query("select").where(["id.value.prop", "LIKE", "bill%"]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select LIKE", (done: MochaDone) => {
        nSQLDefault([
            { id: "billy" }
        ]).query("select").where(["id", "LIKE", "bill%"]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select LIKE", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: "billy" } } }
        ]).query("select").where(["id.value.prop", "LIKE", "bill%"]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select BETWEEN", (done: MochaDone) => {
        nSQLDefault([
            { id: 30 }
        ]).query("select").where(["id", "BETWEEN", [20, 50]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select BETWEEN", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 30 } } }
        ]).query("select").where(["id.value.prop", "BETWEEN", [20, 50]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select NOT BETWEEN", (done: MochaDone) => {
        nSQLDefault([
            { id: 60 }
        ]).query("select").where(["id", "NOT BETWEEN", [20, 50]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select NOT BETWEEN", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: 60 } } }
        ]).query("select").where(["id.value.prop", "NOT BETWEEN", [20, 50]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select INCLUDES", (done: MochaDone) => {
        nSQLDefault([
            { id: [10, 20, 30] }
        ]).query("select").where(["id", "INCLUDES", 20]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select INCLUDES", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: [10, 20, 30] } } }
        ]).query("select").where(["id.value.prop", "INCLUDES", 20]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select NOT INCLUDES", (done: MochaDone) => {
        nSQLDefault([
            { id: [10, 20, 30] }
        ]).query("select").where(["id", "NOT INCLUDES", 25]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select NOT INCLUDES", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: [10, 20, 30] } } }
        ]).query("select").where(["id.value.prop", "NOT INCLUDES", 25]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select INTERSECT", (done: MochaDone) => {
        nSQLDefault([
            { id: [10, 20, 30] }
        ]).query("select").where(["id", "INTERSECT", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select INTERSECT", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: [10, 20, 30] } } }
        ]).query("select").where(["id.value.prop", "INTERSECT", [20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select INTERSECT ALL", (done: MochaDone) => {
        nSQLDefault([
            { id: [10, 20, 30] }
        ]).query("select").where(["id", "INTERSECT ALL", [10, 20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select INTERSECT ALL", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: [10, 20, 30] } } }
        ]).query("select").where(["id.value.prop", "INTERSECT ALL", [10, 20]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Select NOT INTERSECT", (done: MochaDone) => {
        nSQLDefault([
            { id: [10, 20, 30] }
        ]).query("select").where(["id", "NOT INTERSECT", [5, 15]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Nested Select NOT INTERSECT", (done: MochaDone) => {
        nSQLDefault([
            { id: { value: { prop: [10, 20, 30] } } }
        ]).query("select").where(["id.value.prop", "NOT INTERSECT", [5, 15]]).exec().then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Order By Function", (done: MochaDone) => {
        let rows: any[] = [];
        for (let i = 0; i < 50; i++) {
            rows.push({ value: Math.random() > 0.5 ? uuid() : uuid().toUpperCase() })
        }
        nSQLDefault(rows).query("select").orderBy(["UPPER(value) ASC"]).exec().then((result) => {
            const sortedRows = rows.sort((a, b) => {
                return a.value.toUpperCase() > b.value.toUpperCase() ? 1 : -1;
            });
            try {
                expect(sortedRows).to.deep.equal(result);
                done();
            } catch (e) {
                done(e);
            }
        });
    });


    it("Order By Multiple Columns", (done: MochaDone) => {

        const nSQLInstance = new nanoSQL();

        const nSQL = (table?: string) => {
            return nSQLInstance.selectTable(table);
        }

        nSQL().connect({
            id: "test",
            mode: 'TEMP',
            tables: [
                {
                    name: 'users',
                    model: {
                        'id:uuid': { pk: true },
                        'forename:string': {},
                        'surname:string': {},
                        'gender:string': {},
                        'age:int': {},
                        'education:string': {},
                        'occupation:string': {},
                        'salary:int': {}
                    },
                    indexes: {
                        'forename:string': {},
                        'surname:string': {},
                        'age:int': {},
                        'gender:string': {},
                        'education:string': {},
                        'occupation:string': {},
                        'salary:int': {}
                    }
                }
            ]
        }).then(() => {
            const names = JSON.parse(fs.readFileSync(path.join(__dirname, "names.json")).toString());
            return nSQL("users").loadJS(names);
        }).then(() => {
            return nSQL("users").query("select", ["forename", "surname"])
                .where(['age', '<=', 21])
                .orderBy(['surname ASC', 'forename ASC']).exec();
        }).then((rows) => {
            const compareResult = [{ forename: 'Tiana', surname: 'Brown' },
            { forename: 'Maddie', surname: 'Campbell' },
            { forename: 'Daryl', surname: 'Chapman' },
            { forename: 'Freddie', surname: 'Chapman' },
            { forename: 'Freddie', surname: 'Clark' },
            { forename: 'Ryan', surname: 'Cooper' },
            { forename: 'Alexia', surname: 'Craig' },
            { forename: 'Haris', surname: 'Davis' },
            { forename: 'Madaline', surname: 'Ellis' },
            { forename: 'Abigail', surname: 'Evans' },
            { forename: 'Adison', surname: 'Grant' },
            { forename: 'Connie', surname: 'Hamilton' },
            { forename: 'Michael', surname: 'Hamilton' },
            { forename: 'Amy', surname: 'Holmes' },
            { forename: 'Kristian', surname: 'Howard' },
            { forename: 'Grace', surname: 'Johnston' },
            { forename: 'Kellan', surname: 'Jones' },
            { forename: 'Jenna', surname: 'Mason' },
            { forename: 'Honey', surname: 'Perkins' },
            { forename: 'Paul', surname: 'Reed' },
            { forename: 'Vincent', surname: 'Richards' },
            { forename: 'Frederick', surname: 'Riley' },
            { forename: 'Edith', surname: 'Rogers' },
            { forename: 'Lucy', surname: 'Rogers' },
            { forename: 'Kate', surname: 'Taylor' },
            { forename: 'Briony', surname: 'Thompson' },
            { forename: 'Isabella', surname: 'Thompson' },
            { forename: 'Madaline', surname: 'Thompson' },
            { forename: 'Ada', surname: 'Wright' }];
            try {
                expect(rows).to.deep.equal(compareResult);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("PK & Normal Between behave identically.", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["id", "BETWEEN", [29, 49]]).exec();
        }).then((pkRows) => {
            nSQL.query("select").where(["num", "BETWEEN", [29, 49]]).exec().then((numRows) => {

                try {
                    expect(pkRows).to.deep.equal(numRows);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });

    it("Unique Secondary Indexes", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        const queryFinished = (withError?: boolean) => {
            try {
                expect(withError).to.equal(true);
                done();
            } catch (e) {
                done(e);
            }
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": { unique: true }
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("upsert", { id: 60, num: 40 }).exec();
        }).then((pkRows) => {
            queryFinished(false);
        }).catch((err) => {
            queryFinished(true);
        })
    });

    it("Test LIKE Syntax", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "posts",
                    model: {
                        "id:int": { ai: true, pk: true },
                        "userId:int": {},
                        "title:string": {},
                        "body:string": {}
                    }
                }
            ]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["title", "LIKE", "qui%"]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(7);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Test LIKE Syntax 2", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "posts",
                    model: {
                        "id:int": { ai: true, pk: true },
                        "userId:int": {},
                        "title:string": {},
                        "body:string": {}
                    }
                }
            ]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["title", "LIKE", "%magni"]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(2);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Test LIKE Syntax 3", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "posts",
                    model: {
                        "id:int": { ai: true, pk: true },
                        "userId:int": {},
                        "title:string": {},
                        "body:string": {}
                    }
                }
            ]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["body", "LIKE", "%dicta%"]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(9);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Test LIKE Indexing", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "posts",
                    model: {
                        "id:int": { ai: true, pk: true },
                        "userId:int": {},
                        "title:string": {},
                        "body:string": {}
                    },
                    indexes: {
                        "title:string": {}
                    }
                }
            ]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["title", "LIKE", "qui%"]).exec(true);
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(7);
                expect(rows[0].indexes).to.deep.equal([['title', 'LIKE', 'qui%']]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Ignore case secondary indexes.", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "posts",
                    model: {
                        "id:int": { ai: true, pk: true },
                        "userId:int": {},
                        "title:string": {},
                        "body:string": {}
                    },
                    indexes: {
                        "title:string": { ignore_case: true }
                    }
                }
            ]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["title", "=", "qui EST esse"]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(1);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Foreign Key Restraint", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        const queryFinished = (withError?: boolean) => {
            try {
                expect(withError).to.equal(true);
                done();
            } catch (e) {
                done(e);
            }
        }
        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "users",
                    model: {
                        "id:int": { pk: true },
                        "num:int": {}
                    }
                },
                {
                    name: "posts",
                    model: {
                        "id:int": { pk: true },
                        "title:string": {},
                        "user:int": {}
                    },
                    indexes: {
                        "user:int": { foreignKey: { target: "users.id", onDelete: InanoSQLFKActions.RESTRICT } }
                    }
                }
            ]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("users").loadJS(rows);
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, title: uuid(), user: i % 10 === 0 ? 20 : Math.round(Math.random() * 50) });
            }
            return nSQL.selectTable("posts").loadJS(rows);
        }).then(() => {
            return nSQL.selectTable("users").query("delete").where(["id", "=", 20]).exec();
        }).then((pkRows) => {
            queryFinished(false);
        }).catch((err) => {
            queryFinished(true);
        })
    });

    it("Foreign Key Restraint 2", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "users",
                    model: {
                        "id:int": { pk: true },
                        "num:int": {}
                    }
                },
                {
                    name: "posts",
                    model: {
                        "id:int": { pk: true },
                        "title:string": {},
                        "user:int": {}
                    },
                    indexes: {
                        "user:int": { foreignKey: { target: "users.id", onDelete: InanoSQLFKActions.CASCADE } }
                    }
                }
            ]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("users").loadJS(rows);
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, title: uuid(), user: i % 10 === 0 ? 20 : Math.round(Math.random() * 50) });
            }
            return nSQL.selectTable("posts").loadJS(rows);
        }).then(() => {
            return nSQL.selectTable("users").query("delete").where(["id", "=", 20]).exec();
        }).then((pkRows) => {
            return nSQL.selectTable("posts").query("select").where(["user", "=", 20]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(0);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Foreign Key Restraint 3", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "users",
                    model: {
                        "id:int": { pk: true },
                        "num:int": {},
                        "postIds:int[]": {}
                    },
                    indexes: {
                        "postIds:int[]": { foreignKey: { target: "posts.id", onDelete: InanoSQLFKActions.CASCADE } }
                    }
                },
                {
                    name: "posts",
                    model: {
                        "id:int": { pk: true },
                        "title:string": {},
                        "user:int": {}
                    }
                }
            ]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({
                    id: i, num: i, posts: [
                        i % 10 === 0 ? 20 : Math.round(Math.random() * 50),
                        i % 12 === 0 ? 30 : Math.round(Math.random() * 50)
                    ]
                });
            }
            return nSQL.selectTable("users").loadJS(rows);
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, title: uuid(), user: i % 10 === 0 ? 20 : Math.round(Math.random() * 50) });
            }
            return nSQL.selectTable("posts").loadJS(rows);
        }).then(() => {
            return nSQL.selectTable("posts").query("delete").where(["id", "IN", [20, 30]]).exec();
        }).then((pkRows) => {
            return nSQL.selectTable("users").query("select").where(["postIds", "INCLUDES", [20, 30]]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(0);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Foreign Key Restraint 4", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "users",
                    model: {
                        "id:int": { pk: true },
                        "num:int": {},
                        "postIds:int[]": {}
                    },
                    indexes: {
                        "postIds:int[]": { foreignKey: { target: "posts.id", onDelete: InanoSQLFKActions.CASCADE } }
                    }
                },
                {
                    name: "posts",
                    model: {
                        "id:int": { pk: true },
                        "title:string": {},
                        "user:int": {}
                    }
                }
            ]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({
                    id: i, num: i, posts: [
                        i % 10 === 0 ? 20 : Math.round(Math.random() * 50),
                        i % 12 === 0 ? 30 : Math.round(Math.random() * 50)
                    ]
                });
            }
            return nSQL.selectTable("users").loadJS(rows);
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, title: uuid(), user: i % 10 === 0 ? 20 : Math.round(Math.random() * 50) });
            }
            return nSQL.selectTable("posts").loadJS(rows);
        }).then(() => {
            return nSQL.selectTable("posts").query("select").where(["user", "=", 20]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.be.greaterThan(3);
                done();
            } catch (e) {
                done(e);
            }
        }).catch((err) => {
            console.error(err);
        })
    });

    it("Foreign Key Restraint 5", (done: MochaDone) => {
        const nSQL = new nanoSQL();

        nSQL.connect({
            id: "test",
            tables: [
                {
                    name: "users",
                    model: {
                        "id:int": { pk: true },
                        "num:int": {},
                        "postIds:int[]": {}
                    },
                    indexes: {
                        "postIds:int[]": { foreignKey: { target: "posts.list[]", onDelete: InanoSQLFKActions.CASCADE } }
                    }
                },
                {
                    name: "posts",
                    model: {
                        "id:int": { pk: true },
                        "title:string": {},
                        "user:int": {},
                        "list:any[]": {}
                    }
                }
            ]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({
                    id: i, num: i, posts: [
                        i % 10 === 0 ? 20 : Math.round(Math.random() * 50),
                        i % 12 === 0 ? 30 : Math.round(Math.random() * 50)
                    ]
                });
            }
            return nSQL.selectTable("users").loadJS(rows);
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({
                    id: i, title: uuid(), user: i % 10 === 0 ? 20 : Math.round(Math.random() * 50), list: [
                        i % 10 === 0 ? 20 : Math.round(Math.random() * 50),
                        i % 12 === 0 ? 30 : Math.round(Math.random() * 50)
                    ]
                });
            }
            return nSQL.selectTable("posts").loadJS(rows);
        }).then(() => {
            return nSQL.selectTable("posts").query("delete").where(["list", "INCLUDES", [20, 30]]).exec();
        }).then((pkRows) => {
            return nSQL.selectTable("users").query("select").where(["postIds", "INCLUDES", [20, 30]]).exec();
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(0);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Change Events work", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            nSQL.on("change", () => {
                try {
                    expect(true).to.equal(true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
            return nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec();
        }).then((pkRows) => {

        });
    });

    it("Change Events work twice", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            let invocations = 0;
            nSQL.on("change", () => {
                invocations++;
                if (invocations !== 2) {
                    return;
                }
                try {
                    expect(true).to.equal(true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
            return Promise.all([
                nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec(),
                nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec()
            ]);
        }).then((pkRows) => {

        });
    });

    it("Observer work", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            const observer = nSQL.query("select").where(["id", "=", 30]).listen({ debounce: 10 });
            let invocations = 0;
            observer.exec(() => {
                invocations++;
                if (invocations !== 2) {
                    return;
                }
                try {
                    expect(true).to.equal(true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
            return nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec();
        }).then((pkRows) => {

        });
    });

    it("Observer work twice", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            let rows: any[] = [];
            for (let i = 1; i < 50; i++) {
                rows.push({ id: i, num: i });
            }
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            const observer = nSQL.query("select").where(["id", "=", 30]).listen({ debounce: 10 });
            let invocations = 0;
            observer.exec(() => {
                invocations++;
                if (invocations !== 3) {
                    return;
                }
                try {
                    expect(true).to.equal(true);
                    done();
                } catch (e) {
                    done(e);
                }
            });
            setTimeout(() => {
                nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec().then(() => {
                    setTimeout(() => {
                        nSQL.query("upsert", { num: 20 }).where(["id", "=", 30]).exec()
                    }, 100);
                });
            }, 100);
        });
    });

    it("Clone Queries Work", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "posts",
                model: {
                    "id:int": { ai: true, pk: true },
                    "userId:int": {},
                    "title:string": {},
                    "body:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("clone", {
                mode: new SyncStorage(),
                getAdapter: (adapter: InanoSQLAdapter) => {
                    let rows: any[] = [];
                    const tableId = nSQL.getDB("test")._tableIds["posts"];
                    adapter.readMulti(tableId, "all", 0, 0, false, (row) => {
                        rows.push(row);
                    }, () => {
                        try {
                            expect(rows).to.deep.equal(posts);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    }, (err) => {
                        done(err)
                    })
                }
            }).exec();
        }).catch((err) => {
            done(err);
        })
    });

    it("Multi Nested Joins", (done: MochaDone) => {
        TestDBs().then((result) => {
            result.runQuery(`SELECT * from posts`, [], (nSQL) => {
                return nSQL.selectTable("users").query("select").join([
                    {
                        with: { table: "posts" },
                        type: "inner",
                        on: ["users.id", "=", "posts.userId"]
                    },
                    {
                        with: { table: "comments" },
                        type: "inner",
                        on: ["posts.id", "=", "comments.postId"]
                    }
                ]).exec();
            }).then((result) => {
                try {
                    expect(result).to.deep.equal(multiJoinResult);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        })
    });

    it("Copy To Queries Work", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        nSQL.connect({
            id: "test",
            tables: [{
                name: "posts",
                model: {
                    "id:int": { ai: true, pk: true },
                    "userId:int": {},
                    "title:string": {},
                    "body:string": {}
                },
            }, {
                name: "posts2",
                model: {
                    "id:int": { ai: true, pk: true },
                    "userId:int": {},
                    "title:string": {},
                    "body:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("posts").loadJS(posts);
        }).then(() => {
            return nSQL.query("select").where(["id", "<", 20]).copyTo("posts2").exec();
        }).then(() => {
            return nSQL.selectTable("posts2").query("select").exec()
        }).then((rows) => {
            try {
                expect(rows.length).to.equal(19);
                done();
            } catch (e) {
                done(e);
            }
        })
    });

    it("Secondary Index Test (Delete)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 100; i++) {
            rows.push({ id: i, num: i });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("delete").where(["num", "BETWEEN", [29, 49]]).exec();
        }).then((idxRows) => {
            return nSQL.query("select").exec();
        }).then((rows) => {
            try {
                expect(rows.filter(i => i.num <= 29 || i.num >= 49)).to.deep.equal(rows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Int)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: i });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "BETWEEN", [29, 49]]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.num >= 29 && i.num <= 49)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Int 2)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: i });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "=", 30]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.num === 30)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Int 3)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: i });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "IN", [30, 25, 21]]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => [30, 25, 21].indexOf(i.num) !== -1)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Int Nested)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: { prop: i } });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:obj": {
                        model: {
                            "prop:int": {}
                        }
                    }
                },
                indexes: {
                    "num.prop:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num.prop", "BETWEEN", [29, 49]]).exec();
        }).then((idxRows) => {
            const testRows = rows.filter(i => i.num.prop >= 29 && i.num.prop <= 49);
            try {
                expect(testRows).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Compound Where)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: i + 10 });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where([["id", "=", 20], "AND", ["num", "=", 30]]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.id === 20 && i.num === 30)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (Float)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 500; i++) {
            rows.push({ id: i, num: Math.random() });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:float": {}
                },
                indexes: {
                    "num:float": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "BETWEEN", [0.2, 0.7]]).orderBy(["num"]).exec();
        }).then((idxRows) => {
            const testRows = rows.filter(i => i.num >= 0.2 && i.num <= 0.7).sort((a, b) => a.num > b.num ? 1 : -1);
            try {
                expect(testRows).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Test (String)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: uuid() });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:string": {}
                },
                indexes: {
                    "num:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "BETWEEN", ["b", "e"]]).orderBy(["id"]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.num >= "b" && i.num <= "e")).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Offset", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: i - 10 });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:int": {}
                },
                indexes: {
                    "num:int": { offset: 20 }
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["num", "BETWEEN", [-10, 10]]).orderBy(["id"]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.num >= -10 && i.num <= 10)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index (Array)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        let terms: any[] = [];
        for (let i = 0; i < 20; i++) {
            terms.push(uuid());
        }
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, arr: terms.filter(v => Math.random() < 0.2) });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "arr:string[]": {}
                },
                indexes: {
                    "arr:string[]": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["arr", "INCLUDES", terms[0]]).orderBy(["id"]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.arr.indexOf(terms[0]) !== -1)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index (Array Nested)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        let terms: any[] = [];
        for (let i = 0; i < 20; i++) {
            terms.push(uuid());
        }
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, prop: { arr: terms.filter(v => Math.random() < 0.2) } });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "prop:obj": {
                        model: {
                            "arr:string[]": {}
                        }
                    }
                },
                indexes: {
                    "prop.arr:string[]": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["prop.arr", "INCLUDES", terms[0]]).orderBy(["id"]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.prop.arr.indexOf(terms[0]) !== -1)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Rebuild (with where statement)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: uuid() });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:string": {}
                },
                indexes: {
                    "num:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(assign(rows));
        }).then(() => {
            return nSQL.query("rebuild indexes").where(["num", "BETWEEN", ["b", "e"]]).exec();
        }).then((idxRows) => {
            try {
                expect(rows.filter(i => i.num >= "b" && i.num <= "e").sort((a, b) => a.num > b.num ? 1 : -1)).to.deep.equal(idxRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Secondary Index Rebuild (without where statement)", (done: MochaDone) => {
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 50; i++) {
            rows.push({ id: i, num: uuid() });
        }
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "num:string": {}
                },
                indexes: {
                    "num:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("rebuild indexes").exec();
        }).then((idxRows) => {
            try {
                expect(rows).to.deep.equal(idxRows.sort((a, b) => a.id > b.id ? 1 : -1));
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Geo Data Type", (done: MochaDone) => {
        const randomLoc = (): { lon: number, lat: number } => {
            return {
                lat: (Math.random() * 180) - 90,
                lon: (Math.random() * 360) - 180
            }
        }
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 5000; i++) {
            rows.push({ id: i, loc: randomLoc() });
        }
        const lat = (Math.random() * 180) - 90;
        const lon = (Math.random() * 360) - 180;
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "loc:geo": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where([`CROW(loc, ${lat}, ${lon})`, "<", 800]).orderBy(["id"]).exec();
        }).then((resultRows) => {
            try {
                expect(rows.filter(i => {
                    return crowDistance(lat, lon, i.loc.lat, i.loc.lon) < 800;
                })).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Geo Data Type (Indexed)", (done: MochaDone) => {
        const randomLoc = (): { lon: number, lat: number } => {
            return { lon: (Math.random() * 360) - 180, lat: (Math.random() * 180) - 90 }
        }
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 5000; i++) {
            rows.push({ id: i, loc: randomLoc() });
        }
        const lat = (Math.random() * 140) - 70;
        const lon = (Math.random() * 360) - 180;
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "loc:geo": {}
                },
                indexes: {
                    "loc:geo": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where([`CROW(loc, ${lat}, ${lon})`, "<", 800]).orderBy(["id"]).exec();
        }).then((resultRows) => {

            const filterRows = rows.filter(i => {
                return crowDistance(lat, lon, i.loc.lat, i.loc.lon) < 800;
            });

            try {
                expect(filterRows).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    }).timeout(4000);

    it("Geo Data Type (Indexed Pole Query)", (done: MochaDone) => {
        const randomLoc = (): { lon: number, lat: number } => {
            return { lon: (Math.random() * 360) - 180, lat: (Math.random() * 180) - 90 }
        }
        const nSQL = new nanoSQL();
        let rows: any[] = [];
        for (let i = 1; i < 5000; i++) {
            rows.push({ id: i, loc: randomLoc() });
        }
        const lat = (Math.random() * 9) + 80;
        const lon = (Math.random() * 360) - 180;
        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": { pk: true },
                    "loc:geo": {}
                },
                indexes: {
                    "loc:geo": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where([`CROW(loc, ${lat}, ${lon})`, "<", 800]).orderBy(["id"]).exec();
        }).then((resultRows) => {

            const filterRows = rows.filter(i => {
                return crowDistance(lat, lon, i.loc.lat, i.loc.lon) < 800;
            });

            try {
                expect(filterRows).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    }).timeout(4000);

    it("Date Data Type (Primary Key)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: time.toISOString(), name: randomString() });
        }

        const get = JSON.parse(JSON.stringify(rows[Math.round(Math.random() * 499)]));

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:date": { pk: true },
                    "name:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["id", "=", get.id]).exec();
        }).then((resultRows) => {
            try {
                expect(get).to.deep.equal(resultRows[0]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Date Data Type (Primary Key Range)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: time.toISOString(), name: randomString() });
        }

        const range = assign(rows).filter((v, i) => i > 200 && i < 300);

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:date": { pk: true },
                    "name:string": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["id", "BETWEEN", [range[0].id, range[range.length -1].id]]).exec();
        }).then((resultRows) => {
            try {
                expect(range).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Date Data Type (Secondary Index)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: i, time: time.toISOString() });
        }

        const get = JSON.parse(JSON.stringify(rows[Math.round(Math.random() * 499)]));

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": {pk: true },
                    "time:date": {}
                },
                indexes: {
                    "time:date": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["time", "=", get.time]).exec();
        }).then((resultRows) => {
            try {
                expect(get).to.deep.equal(resultRows[0]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Date Data Type (Secondary Index Range)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: i, time: time.toISOString() });
        }

        const range = assign(rows).filter((v, i) => i > 200 && i < 300);

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": {pk: true },
                    "time:date": {}
                },
                indexes: {
                    "time:date": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["time", "BETWEEN", [range[0].time, range[range.length -1].time]]).exec();
        }).then((resultRows) => {
            try {
                expect(range).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Date Data Type (No Index)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: i, time: time.toISOString() });
        }

        const get = JSON.parse(JSON.stringify(rows[Math.round(Math.random() * 499)]));

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": {pk: true },
                    "time:date": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["time", "=", get.time]).exec();
        }).then((resultRows) => {
            try {
                expect(get).to.deep.equal(resultRows[0]);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

    it("Date Data Type (No Index Range)", (done: MochaDone) => {

        const nSQL = new nanoSQL();
        let rows: any[] = [];
        const now = Date.now();
        for (let i = 1; i < 500; i++) {
            const time = new Date(now + (i * 1000));
            rows.push({ id: i, time: time.toISOString() });
        }

        const range = assign(rows).filter((v, i) => i > 200 && i < 300);

        nSQL.connect({
            id: "test",
            tables: [{
                name: "test",
                model: {
                    "id:int": {pk: true },
                    "time:date": {}
                }
            }]
        }).then(() => {
            return nSQL.selectTable("test").loadJS(rows);
        }).then(() => {
            return nSQL.query("select").where(["time", "BETWEEN", [range[0].time, range[range.length -1].time]]).exec();
        }).then((resultRows) => {
            try {
                expect(range).to.deep.equal(resultRows);
                done();
            } catch (e) {
                done(e);
            }
        });
    });

});
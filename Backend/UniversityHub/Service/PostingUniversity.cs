using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using UniversityHub.Data;
using UniversityHub.Models;
using UniversityHub.Service;


public class PostingUniversity : IPostinngUniversity
{
    private readonly DatabaseContext _databaseContext;
    public PostingUniversity(DatabaseContext databaseContext)
    {

        _databaseContext = databaseContext;    

    }

    public async Task<Applications> PostAsync(string username,string universityname)
    {

        Applications app = new Applications();

        app.UniversityName = universityname;
        app.StudentName = username;

       _databaseContext.applications.Add(app);
        await _databaseContext.SaveChangesAsync();

        return app;
    }
}

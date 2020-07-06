using Hades.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Data
{
    public class DbDataProvider
    {
        private ApplicationDbContext applicationDbContext;
        private UserManager<ApplicationUser> userManager;

        public DbDataProvider(ApplicationDbContext applicationDbContext, UserManager<ApplicationUser> userManager)
        {
            this.applicationDbContext = applicationDbContext;
            this.userManager = userManager;
        }

        public async Task CreateGroupAsync(Group group, ApplicationUser groupFounder)
        {
            await AddAplicationUserAsync(groupFounder);
            await applicationDbContext.AddAsync(group);

            await applicationDbContext.SaveChangesAsync();
        }

        public Group GetGroup(string groupName)
        {
            return applicationDbContext.Groups.FirstOrDefault(g => g.Name.Equals(groupName));
        }

        public bool DoesGroupExist(string groupName)
        {
            if (GetGroup(groupName) == null)
            {
                return false;
            }
            else
            {
                return true;
            }
        }


        public async Task AddAplicationUserAsync(ApplicationUser applicationUser)
        {
            // Use NickName as UserName
            string consideredUserName = applicationUser.NickName;
            int counter = 0;
            // If this username is already taken, add number
            while (await GetApplicationUserAsync(consideredUserName) != null)
            {
                // Try it again but with a number
                consideredUserName = applicationUser.NickName + counter.ToString();
                
                // If we run this again, we need the number incremented to try another username variant
                counter++;
            }
            applicationUser.UserName = consideredUserName;
            await userManager.CreateAsync(applicationUser);
        }

        public async Task<ApplicationUser> GetApplicationUserAsync(string userName)
        {
            return await userManager.FindByNameAsync(userName);
        }

        public async Task AddStudentToAGroupAsync(ApplicationUser student, string groupName)
        {
            Group group = GetGroup(groupName);
            await AddAplicationUserAsync(student);
            student = await GetApplicationUserAsync(student.UserName);
            
            StudentGroup studentGroup = new StudentGroup
            {
                Group = group,
                GroupId = group.GroupId,
                Student = student,
                StudentId = student.Id
            };

            applicationDbContext.StudentGroup.Add(studentGroup);           
            await applicationDbContext.SaveChangesAsync();
        }

        
    }
}
